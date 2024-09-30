const mongoose = require('mongoose')
const StatSchema = mongoose.Schema({
    users: Number,
    categories: Number,
    articles: Number,
    createdAt: Date
})
const Stat =  mongoose.model('Stat', StatSchema)
module.exports = Stat