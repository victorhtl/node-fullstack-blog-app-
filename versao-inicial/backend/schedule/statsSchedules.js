const schedule = require('node-schedule')
const db = require('../Database/db.js')
const Stat = require('../config/mongodbModels.js')

schedule.scheduleJob('*/1 * * * *', async function () {
    const usersCount = await db('users').count('id').first()
    const categoriesCount = await db('categories').count('id').first()
    const articlesCount = await db('articles').count('id').first()

    const lastStat = await Stat.findOne({}, {}, { sort: {'createdAt' : -1}})

    const stat = new Stat({
        users: usersCount.count,
        categories: categoriesCount.count,
        articles: articlesCount.count,
        createdAt: new Date()
    })

    const changeUsers = !lastStat || stat.users !== lastStat.users
    const changeCategories = !lastStat || stat.categories !== lastStat.categories
    const changeArticles = !lastStat || stat.articles !== lastStat.articles

    if(changeUsers || changeCategories || changeArticles){
        stat.save().then(()=>console.log('Stats updated'))
    }
})