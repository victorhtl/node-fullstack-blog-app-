const express = require('express')

const router = express.Router()

router.post('/', async (req, res)=>{
    const user = {...req.body}

    // only admin can register a admin
    if(!req.user.admin) user.admin = false
    
    try {
        existsOrError(user.name, 'Name is missing')
        existsOrError(user.email, 'Email is missing')
        existsOrError(user.password, 'Password is missing')
        existsOrError(user.confirmPassword, 'Confirm Password is missing')
        equalsOrError(user.password, user.confirmPassword, 'Passwords do not match')
        delete user.confirmPassword
        const userFromDB = await db('users').where({email: user.email}).first()
        notExistsOrError(userFromDB, 'User already exists')

    } catch(msg) {
        return res.status(400).send(msg)
    }

    user.password = await encryptPassword(user.password)
    
    db('users')
        .insert(user, 'id')
        .then(id => res.status(200).send(id))
        .catch(err => res.status(500).send(err))
})

module.exports = router