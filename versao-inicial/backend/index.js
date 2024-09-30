const express = require('express')
const cors = require('cors')
const passport = require('passport')

require('./config/mongodb.js')
require('./schedule/statsSchedules.js')
require('./config/mongodbModels.js')

const app = express()

require('./config/passport.js')(passport)
passport.initialize()

// api
const user = require('./api/user.js')
const categories = require('./api/category.js')
const articles = require('./api/article.js')
const auth = require('./api/auth.js')
const register = require('./api/register.js')
const stat = require('./api/stat.js')

app.use(express.json())
app.use(cors())

// public
app.use('/signin', auth)
app.use('/signup', register)

/**
 * Passport will verify the token's exp date
 * and create the req.user obj for every request
 */
app.use(passport.authenticate('jwt', {session: false}))

// JWT required
app.use('/users', user)
app.use('/categories', categories)
app.use('/articles', articles)
app.use('/stats', stat)

app.listen(3000, ()=>{
    console.log('backend executando porta 3000')
})