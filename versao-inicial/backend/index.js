const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') 

const app = express()

// Endpoints
const user = require('./api/user.js')
const categories = require('./api/category.js')
const articles = require('./api/article.js')

app.use(bodyParser.json())
app.use(cors())

app.use('/users', user)
app.use('/categories', categories)
app.use('/articles', articles)

app.listen(3000, ()=>{
    console.log('backend executando porta 3000')
})

module.exports = app