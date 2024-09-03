# knowledge

## Run backend
- cd backend
- npm i
- npm start


## Tentativa de utilizar o jwt

const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const db = require('../Database/db.js')

// estrategia
module.exports = (req, res, next) => {
    // o passport-jwt vai pegar o cabeçalho "authorization" da requisição e ler o token que veio com ele
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() // o token vai vir com "bearer" antes no token em si
    }

    // o payload é o mesmo gerado em auth.js com as informações de usuário
    const strategy = new Strategy(params, (payload, done)=>{
        db('users')
            .where({id: payload.id})
            .first()
            .then(user => done(null, user ? {...payload} : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    passport.authenticate('jwt', {session:false})

    next()
}