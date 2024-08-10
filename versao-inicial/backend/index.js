const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') 

const app = express()

// Endpoints
const user = require('./api/user.js')

app.use(bodyParser.json())
app.use(cors())

app.use('/users', user)

app.listen(3000, ()=>{
    console.log('backend executando porta 3000')
})

module.exports = app