const express = require('express')
const {existsOrError, notExistsOrError, equalsOrError} = require('./validation.js')
const db = require('../Database/db.js')

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

router.get('/:id', (req, res)=>{
    db('categories')
        .where({id: req.params.id})
        .first()
        .then(category => res.json(category))
        .catch(err => res.status(500).send(err))
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
    } catch(msg){
        res.status(400).send(msg)
    }

    await db('categories')
        .insert(category)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
})

router.put('/', async (req, res) =>{
    const category = {...req.body}

    try {
        existsOrError(category.name, 'Category name is missing')
        existsOrError(category.id, 'Category id is missing')
    } catch(msg){
        res.status(400).send(msg)
    }

    await db('categories')
        .update(category)
        .where({id: category.id})
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
})

router.delete('/', async (req, res)=>{
    try {
        existsOrError(req.params.id, 'Category id is missing')

        const subcategory = await db('categories')
            .where({parentId: req.params.id})
        notExistsOrError(subcategory, 'Category has subcategories')

        const articles = await db('categories')
            .where({categoryId: req.params.id})
        notExistsOrError(articles, 'Category has articles')

        const rowsDeleted = await db('categories')
            .where({id: req.params.id}).del()
        existsOrError(rowsDeleted, 'Category not found')

        res.status(204).send()

    } catch(msg){
        res.status(400).send(msg)
    }
})

module.exports = router