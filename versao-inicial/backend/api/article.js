const {existsOrError, isNotPositiveInteger} = require('./validation.js')
const express = require('express')
const db = require('../Database/db.js')

const router = express.Router()

router.post('/', (req, res)=>{
    const article = {...req.body}

    try {
        existsOrError(article.name, 'Name is missing')
        existsOrError(article.description, 'Description is missing')
        existsOrError(article.categoryId, 'Category is missing')
        existsOrError(article.userId, 'Author is missing')
        existsOrError(article.content, 'Content is missing')
    
        db('articles')
            .insert(article)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(msg))
    } catch(msg) {
        res.status(400).send(msg)
    }
})

router.put('/:id', (req, res)=>{
    const article = {...req.body}
    const articleId = req.params.id

    if(isNotPositiveInteger(articleId)){
        res.status(400).send('Id must be a positive integer numeber')
        return
    }

    try {
        existsOrError(article.name, 'Name is missing')
        existsOrError(article.description, 'Description is missing')
        existsOrError(article.categoryId, 'Category is missing')
        existsOrError(article.userId, 'Author is missing')
        existsOrError(article.content, 'Content is missing')
    
        db('articles')
            .update(article)
            .where({id})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(msg))
    } catch(msg) {
        res.status(400).send(msg)
    }
})

router.delete('/:id', async (req, res) => {
    const articleId = req.params.id

    if(isNotPositiveInteger(articleId)){
        res.status(400).send('Id must be a positive integer numeber')
        return
    }

    try {
        const rowsDeleted = await db('articles')
            .where({id: articleId}).del()
        
        try{
            existsOrError(rowsDeleted, 'Article not founded')
        } catch(msg){
            return res.status(400).send(msg)
        }
    
        res.status(204).send()
    } catch(msg){
        res.status(500).send(msg)
    }
})

router.get('/:id', (req, res)=>{
    const articleId = req.params.id
    if(isNotPositiveInteger(articleId)){
        res.status(400).send('Id must be a positive integer numeber')
        return
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

// Paginacao
const limit = 10
router.get('/', async (req, res)=>{
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