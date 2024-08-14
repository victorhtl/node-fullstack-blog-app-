const express = require('express')
const {existsOrError, notExistsOrError, isNotPositiveInteger} = require('./validation.js')
const db = require('../Database/db.js')
const queries = require('./queries.js')

const router = express.Router()

const withPath = categories => {
    const getParent = (categories, parentId) => {
        const parent = categories.filter(parent => parent.id === parentId)
        return parent.length ? parent[0] : null
    }

    const categoriesWithPath = categories.map(category => {
        let path = category.name
        let parent = getParent(categories, category.parentId)

        while(parent){
            path = `${parent.name} > ${path}`
            parent = getParent(categories, parent.parentId)
        }

        return {...category, path}
    })

    categoriesWithPath.sort((a,b)=>{
        if(a.path < b.path) return -1
        if(a.path > b.path) return 1
        return 0
    })

    return categoriesWithPath
}

// transforma um array em uma estrutura de árvore
const toTree = (categories, tree) => {
    if(!tree) tree = categories.filter(c => !c.parentId)
    tree = tree.map(parentNode => {
        const isChild = node => node.parentId == parentNode.id
        parentNode.children = toTree(categories, categories.filter(isChild))
        return parentNode
    })
    return tree
}

const limit = 10
router.get('/:id/articles', async(req, res)=>{
    const categoryId = req.params.id
    const page = req.query.page || 1
    const categories = await db.raw(queries.categoryWithChildren, categoryId)
    const ids = categories.rows.map(c=>c.id)

    db({a: 'articles', u:'users'})
        .select('a.id', 'a.name', 'á.description', 'a.imageUrl', {author: 'u.name'})
        .limit(limit).offset(page * limit - limit)
        .whereRaw('?? == ??', ['u.id', 'a.userId'])
        .whereIn('categoryId', ids)
        .orderBy('a.id', 'desc')
        .then(articles => res.json(articles))
        .catch(err => res.status(500).send(err))
})


// Retorna um JSON
router.get('/tree', (req, res)=>{
    db('categories')
        .then(categories => res.json(toTree(categories)))
        .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res)=>{
    const categoryId = req.params.id

    if(isNotPositiveInteger(categoryId)){
        res.status(400).send('Id must be a positive integer numeber')
        return
    }
    try {
        const category = db('categories')
            .where({id: categoryId})
            .first()
            
        existsOrError(category, 'category do not exist')

        res.json(category)
    }catch(msg){
        res.status(400).send('No category found')
    }
})

router.get('/', (req, res)=>{
    db('categories')
        .then(categories => res.json(withPath(categories)))
        .catch(err => res.status(500).send(err))
})

router.post('/', async (req, res) => {
    const category = {...req.body}

    try {
        existsOrError(category.name, 'Category Name is missing')
    
        db('categories')
            .insert(category)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } catch(msg){
        res.status(400).send(msg)
    }
})

router.put('/', (req, res) =>{
    const category = {...req.body}

    try {
        existsOrError(category.name, 'Category name is missing')
        existsOrError(category.id, 'Category id is missing')
    
        db('categories')
            .update(category)
            .where({id: category.id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    } catch(msg){
        res.status(400).send(msg)
    }
})

router.delete('/:id', async (req, res)=>{
    const categoryId = req.params.id

    if(isNotPositiveInteger(categoryId)){
        res.status(400).send('Id must be a positive integer numeber')
        return
    }

    try {
        existsOrError(categoryId, 'Category id is missing')

        const subcategory = await db('categories')
            .where({parentId: categoryId})
        notExistsOrError(subcategory, 'Category has subcategories')

        const articles = await db('categories')
            .where({categoryId: categoryId})
        notExistsOrError(articles, 'Category has articles')

        const rowsDeleted = await db('categories')
            .where({id: categoryId}).del()
        existsOrError(rowsDeleted, 'Category not found')

        res.status(204).send()

    } catch(msg){
        res.status(400).send(msg)
    }
})

module.exports = router