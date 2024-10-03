const bcrypt = require('bcrypt')
const express = require('express')
const {existsOrError, notExistsOrError, equalsOrError, isNotPositiveInteger} = require('./validation.js')
const db = require('../Database/db.js')
const isAdmin = require('../config/admin.js')

const router = express.Router()

function encryptPassword(password) {
    const saltRounds = 10; // between 10-12 is recommended
    return bcrypt.genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
            return hash;
        })
        .catch(err => {
            throw err;
        });
}

router.get('/:id', isAdmin, async (req, res)=>{
    const userId = parseInt(req.params.id)

    if(isNotPositiveInteger(userId)){
        return res.status(400).send('Id must be a positive number')
    }

    try {
        const user = await db('users')
            .select('id', 'name', 'email', 'admin')
            .whereNull('deletedAt')
            .where({id: userId})
            .first()
            .catch(err => res.sendStatus(500))
        
        existsOrError(user, 'User not exists')
        res.status(200).send(user)
    } catch(msg) {
        return res.status(400).send(msg)
    }
})

router.post('/', isAdmin, async (req, res)=>{
    const user = {...req.body}
    
    try {
        existsOrError(user.name, 'Name is missing')
        existsOrError(user.email, 'Email is missing')
        existsOrError(user.password, 'Password is missing')
        existsOrError(user.confirmPassword, 'Confirm Password is missing')
        equalsOrError(user.password, user.confirmPassword, 'Passwords do not match')
        delete user.confirmPassword
        const userFromDB = await db('users').where({email: user.email}).first()
        notExistsOrError(userFromDB, 'User already exists')

    } catch(msg) {
        return res.status(400).send(msg)
    }

    user.password = await encryptPassword(user.password)
    
    db('users')
        .insert(user, 'id')
        .then(id => res.status(200).send(id))
        .catch(err => res.status(500).send(err))
})

router.get('/', isAdmin, (req, res)=>{
    db('users')
        .select('id', 'name', 'email', 'admin')
        .whereNull('deletedAt')
        .then(resp => res.status(200).json(resp))
        .catch(err => res.status(500).send(err))   
})

router.put('/:id', isAdmin, async (req,res)=>{
    const user = {...req.body}
    user.id = req.params.id

    if(isNotPositiveInteger(user.id)){
        res.status(400).send('Id must be a positive integer numeber')
        return
    }

    try {
        existsOrError(user.id, "Id is missing")
        existsOrError(user.name, 'Name is missing')
        existsOrError(user.email, 'Email is missing')
        existsOrError(user.password, 'Password is missing')
        existsOrError(user.confirmPassword, 'Confirm Password is missing')
        equalsOrError(user.password, user.confirmPassword, 'Passwords do not match')
    
        const userFromDB = await db('users').where({id: user.id}).first()
        existsOrError(userFromDB, 'User do not exist')
    
        
    } catch(msg) {
        return res.status(400).send(msg)
    }

    user.password = encryptPassoword(user.password)
    user.password = encryptPassoword(user.password)
    delete user.confirmPassword

    db('users')
        .update(user)
        .where({id: user.id})
        .whereNull('deletedAt')
        .then(_s => res.sendStatus(204))
        .catch(err => res.status(500).send(err))
    
})

router.delete('/:id', async(req,res)=>{
    const userId = parseInt(req.params.id)

    if(isNotPositiveInteger(userId)){
        return res.status(400).send('Id must be a positive integer number')
    }

    try {
        const articles = await db('articles')
            .where({userId:userId})
        notExistsOrError(articles, 'User has articles')

        const rowsUpdated = await db('users')
            .update({deletedAt: new Date()})
            .where({id: userId})
        existsOrError(rowsUpdated, 'User do not exist')    
    } catch(msg){
        return res.status(400).send(msg)
    }
})

module.exports = router