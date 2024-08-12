const {existsOrError, notExistsOrError, equalsOrError, isNotPositiveInteger} = require('./validation.js')
const express = require('express')
const db = require('../Database/db.js')

const router = express.Router()

router.get('/', ()=>{})

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

        notExistsOrError(rowsDeleted, 'Article not founded')
    
        res.status(204).send()
    } catch(msg){
        res.status(500).send(msg)
    }
})

module.exports = router