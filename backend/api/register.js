const express = require('express')
const db = require('../Database/db.js')
const {existsOrError, notExistsOrError, equalsOrError} = require('./validation.js')
const encryptPassword = require('./bcrypt_conf.js')

const router = express.Router()

router.post('/', async (req, res)=>{
    const user = {...req.body}
    
    try {
        existsOrError(user.name, 'Name is missing')
        existsOrError(user.email, 'Email is missing')
        existsOrError(user.password, 'Password is missing')
        existsOrError(user.confirmPassword, 'Confirm Password is missing')
        equalsOrError(user.password, user.confirmPassword, 'Passwords do not match')
        delete user.confirmPassword
        const userFromDB = await db('users').where({email: user.email}).whereNull('deletedAt').first()
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

module.exports = router