const express = require('express')
const {existsOrError, notExistsOrError, isNotPositiveInteger} = require('./validation.js')
const db = require('../Database/db.js')
const queries = require('./queries.js')
const isAdmin = require('../config/admin.js')

const router = express.Router()

// Pagincaçao
const limit = 10

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

router.get('/:id/articles', async(req, res)=>{
    const categoryId = req.params.id
    const page = req.query.page || 1
    // A query abaixo seleciona todos os IDs baseados nos ids pai
    const categories = await db.raw(queries.categoryWithChildren, categoryId)
    const ids = categories.rows.map(c => c.id)

    // Consulta que interage com 2 tabelas, articles e users
    // para recuperar o nome do usuário para aquele artigo
    db({a: 'articles', u: 'users'})
        .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
        .limit(limit).offset(page * limit - limit)
        .whereRaw('?? = ??', ['u.id', 'a.userId'])
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

router.get('/:id', async (req, res)=>{
    const categoryId = req.params.id

    if(isNotPositiveInteger(parseInt(categoryId))){
        return res.status(400).send('Id must be a positive integer numeber')
    }
    try {
        const category = await db('categories')
            .select('id', 'name', 'parentId')
            .where({id: categoryId})
            .first()
            
        existsOrError(category, 'category do not exist')
        res.status(200).send(category)
    } catch(msg){
        return res.status(400).send(msg)
    }
})

router.get('/', isAdmin, (req, res)=>{
    db('categories')
        .then(categories => res.json(withPath(categories)))
        .catch(err => res.status(500).send(err))
})

router.post('/', isAdmin, (req, res) => {
    const category = {...req.body}

    try {
        existsOrError(category.name, 'Category Name is missing')
    } catch(msg){
        return res.status(400).send(msg)
    }

    db('categories')
        .insert(category, 'id')
        .then(id => res.status(200).send(id))
        .catch(err => res.status(500).send(err))
})

router.put('/:id', isAdmin, (req, res) =>{
    const category = {...req.body}
    category.id = req.params.id

    try {
        existsOrError(category.name, 'Category name is missing')
        existsOrError(category.id, 'Category id is missing')
    } catch(msg){
        return res.status(400).send(msg)
    }
    db('categories')
        .update(category)
        .where({id: category.id})
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
})

router.delete('/:id', isAdmin, async (req, res)=>{
    const categoryId = req.params.id

    if(isNotPositiveInteger(parseInt(categoryId))){
        return res.status(400).send('Id must be a positive integer number')
    }

    try {
        existsOrError(categoryId, 'Category id is missing')

        const subcategory = await db('categories')
            .where({parentId: categoryId})
        notExistsOrError(subcategory, 'Category has subcategories')

        const articles = await db('articles')
            .where({categoryId: categoryId})
        notExistsOrError(articles, 'Category has articles')

        const rowsDeleted = await db('categories')
            .where({id: categoryId}).del()
        existsOrError(rowsDeleted, 'Category not found')

        res.sendStatus(200)

    } catch(msg){
        return res.status(400).send(msg)
    }
})

module.exports = router