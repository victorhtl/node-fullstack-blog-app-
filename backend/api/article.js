const {existsOrError, isNotPositiveInteger} = require('./validation.js')
const express = require('express')
const db = require('../Database/db.js')
const isAdmin = require('../config/admin.js')

const router = express.Router()

// Paginacao dos articles
const limit = 10

router.post('/', isAdmin, (req, res)=>{
    const article = {...req.body}

    try {
        existsOrError(article.name, 'Name is missing')
        existsOrError(article.description, 'Description is missing')
        existsOrError(article.categoryId, 'Category is missing')
        existsOrError(article.userId, 'Author is missing')
        existsOrError(article.content, 'Content is missing')
    } catch(msg) {
        return res.status(400).send(msg)
    }
    db('articles')
        .insert(article, 'id')
        .then(id => res.status(200).send(id))
        .catch(err => res.status(500).send(err))
})

router.put('/', isAdmin, (req, res)=>{
    const article = {...req.body}

    try {
        existsOrError(article.id, 'Id is missing')
        existsOrError(article.name, 'Name is missing')
        existsOrError(article.description, 'Description is missing')
        existsOrError(article.categoryId, 'Category is missing')
        existsOrError(article.userId, 'Author is missing')
        existsOrError(article.content, 'Content is missing')
    } catch(msg) {
        return res.status(400).send(msg)
    }
    db('articles')
        .update(article)
        .where({id: article.id})
        .then(_ => res.sendStatus(204))
        .catch(err => res.status(500).send(err))
})

router.delete('/:id', isAdmin, async (req, res) => {
    const articleId = req.params.id

    if(isNotPositiveInteger(parseInt(articleId))){
        return res.status(400).send('Id must be a positive integer number')
    }

    try {
        const rowsDeleted = await db('articles')
            .where({id: articleId}).del()
    
        existsOrError(rowsDeleted, 'Article not found')
    
        res.sendStatus(204)
    } catch(msg){
        return res.status(400).send(msg)
    }
})

router.get('/:id', (req, res)=>{
    const articleId = req.params.id

    if(isNotPositiveInteger(parseInt(articleId))){
        return res.status(400).send('Id must be a positive integer number')
    }

    db('articles')
        .where({id: articleId})
        .first()
        .then(article => {
            article.content = article.content.toString()
            return res.json(article)
        })
        .catch(err => res.status(500).send(err))
})

router.get('/', isAdmin, async (req, res)=>{
    const page = req.query.page || 1

    const result = await db('articles').count('id').first()
    const count = parseInt(result.count)

    db('articles')
        .select('id', 'name', 'description')
        .limit(limit).offset(page * limit - limit)
        .then(articles => res.json({data: articles, count, limit}))
        .catch(err => res.status(500).send(err))
})

module.exports = router