const bcrypt = require('bcrypt')

module.exports =  async function encryptPassword(password){
    const saltRounds = 10
    return bcrypt.genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
            return hash
        })
        .catch(err => {
            throw err
        })
}