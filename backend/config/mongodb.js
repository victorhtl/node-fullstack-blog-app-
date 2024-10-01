const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true})
    .catch(e => {
        console.log('MongoDB connection not successful')
    })
mongoose.connection.on('connected', ()=>console.log('mongodb connected'))