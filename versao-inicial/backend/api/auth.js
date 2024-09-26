const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const express = require('express')
const db = require('../Database/db.js')

const router = express.Router()

// valida o login e gera o token
// password deve ser uma string
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

    // utiliza o Date.now() para definir o periodo de expiracao do token
    const now = Math.floor(Date.now() / 1000) // segundos
    
    // para criar o token
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        iat: now, // emido em
        exp: now + (60*60*24*3) // expira em 3 dias
    }

    res.json({
        ...payload,
        token: jwt.encode(payload, authSecret)
    })
})

// Validate token according to date
router.post('/validateToken', (req, res)=>{
    const user = req.body || null
    try {
        if(user){
            // decodifica o token utilizando decode e o authSecret
            const token = jwt.decode(userData.token, authSecret)

            // Verifica a idade do token
            if(new Date(token.exp * 1000  > new Date())){
                return res.send(true)
            }
        }
    } catch(err){
        // se o token expirou
        // se o authSecret estive errado
    }

    res.send(false)
})

module.exports = router