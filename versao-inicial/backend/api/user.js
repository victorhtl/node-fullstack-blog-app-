const bcrypt = require('bcrypt-nodejs') // encriptar senha de usuario
const express = require('express')
const {existsOrError, notExistsOrError, equalsOrError} = require('./validation.js')
const db = require('../Database/db.js')

const router = express.Router()

function encryptPassoword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

router.get('/:id', async (req, res)=>{
    await db('users')
        .select('id', 'name', 'email', 'admin')
        .where({id: req.params.id})
        .first()
        .then(user => {
            try {
                existsOrError(user, 'There is no user that matches this id')
            } catch(msg){
                res.status(404).send(msg)
            }
            res.json(user)
        })
})

router.get('/', async (req, res)=>{
    await db('users')
        .select('id', 'name', 'email', 'admin')
        // ISTO AQUI TA UMA ZONA
        .then(users => {
            try{
                existsOrError(users, 'There is no user that matches this id')
            } catch(msg){
                res.status(500).send(msg)
            }
            res.json(users)
        })
})

router.post('/', async (req, res)=>{
    const user = {...req.body}
    
    try {
        existsOrError(user.name, 'Name is missing')
        existsOrError(user.email, 'Email is missing')
        existsOrError(user.password, 'Password is missing')
        existsOrError(user.confirmPassword, 'Confirm Password is missing')
        equalsOrError(user.password, user.confirmPassword, 'Passwords do not match')
    
        const userFromDB = await db('users').where({email: user.email}).first()
        notExistsOrError(userFromDB, 'User already exists')
    } catch(msg) {
        res.status(400).send(msg)
    }

    user.password = encryptPassoword(user.password)
    delete user.confirmPassword

    db('users')
        .insert(user)
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
})

// Precisa enviar com id no body da requisicao
router.put('/:id', async (req,res)=>{
    const user = {...req.body}
    user.id = req.params.id

    try {
        existsOrError(user.name, 'Name is missing')
        existsOrError(user.email, 'Email is missing')
        existsOrError(user.password, 'Password is missing')
        existsOrError(user.confirmPassword, 'Confirm Password is missing')
        equalsOrError(user.password, user.confirmPassword, 'Passwords do not match')
    
        const userFromDB = await db('users').where({id: user.id}).first()
        ExistsOrError(userFromDB, 'User not exists')
    } catch(msg) {
        res.status(400).send(msg)
    }

    db('users')
        .update(user)
        .where({id: user.id})
        .then(_ => res.status(204).send())
        .catch(err => res.status(500).send(err))
})

module.exports = router