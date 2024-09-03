const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') 

const app = express()

// api
const user = require('./api/user.js')
const categories = require('./api/category.js')
const articles = require('./api/article.js')
const auth = require('./api/auth.js')

app.use(bodyParser.json())
app.use(cors())

// essas urls só podem ser acessadas com token gerado por auth.js
app.use('/users', user)
app.use('/categories', categories)
app.use('/articles', articles)

// urls publicas
app.use('/signin', auth) // gera e valida o token em auth.js
app.use('/signup', (req, res)=>res.redirect(307, '/users')) // redireciona para o post

app.listen(3000, ()=>{
    console.log('backend executando porta 3000')
})

module.exports = app