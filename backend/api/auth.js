const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const express = require('express')
const db = require('../Database/db.js')

const router = express.Router()

require('dotenv').config

router.post('/validateToken', (req, res)=>{
    const userData = req.body || null
    console.log(userData)
    try {
        if(userData){
            const token = jwt.decode(userData.token, process.env.AUTHSECRET) // verificar se este userData.token existe mesmo
            if(new Date(token.exp * 1000)> new Date()){
                return res.send(true)
            }
        }
    } catch(e){
        
    }
    res.send(false)
})


// validate the user and generate JWT
router.post('/', async (req, res)=>{
    // valida o usuario
    if(!req.body.email || !req.body.password){
        return res.status(400).send('User and Password is missing')
    }

    if(typeof req.body.password !== 'string'){
        return res.status(400).send('Password must be a string')
    }

    const user = await db('users')
        .where({email: req.body.email})
        .first()

    if(!user) {
        return res.status(400).send('User not found')
    }
    
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if(!isMatch) return res.status(401).send('Email/Password wrong')

    const now = Math.floor(Date.now() / 1000) // segundos
    
    // para criar o token
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        iat: now, // issued at
        exp: now + (60*60*24*3) // expires in 3d
    }

    res.json({
        ...payload,
        token: jwt.encode(payload, process.env.AUTHSECRET)
    })
})


module.exports = router