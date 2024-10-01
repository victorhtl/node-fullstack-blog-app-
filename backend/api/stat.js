const express = require('express')
const router = express.Router()
const Stat = require('../config/mongodbModels.js')

router.get('/', (req, res)=>{
    Stat.findOne({}, {}, {sort: {'createdAt' : -1}})
        .then(stat => {
            const def = {
                "users": 0,
                "categories": 0,
                "articles": 0
            }
            res.json(stat || def)
        })
})

module.exports = router
