const app = require('../index.js')
const request = require('supertest')

describe('EndPoint /users', ()=> {
    describe('POST', ()=>{
        it('must return status 201 for post new user', async()=>{
            const newUser = {name: 'userTest', email: 'user_test@email.com', password: '123456', confirmPassword: '123456'}
            const response = await request(app).post('/users').send(newUser)
            expect(response.statusCode).toBe(204)
        })
        it('must return status 400 when name is missing', async()=>{
            const newUser = {email: 'user_test@email.com', password: '123456', confirmPassword: '123456'}
            const response = await request(app).post('/users').send(newUser)
            expect(response.statusCode).toBe(400)
            expect(response.text).toBe('Name is missing')
        })
        it('must return status 400 when email is missing', async()=>{
            const newUser = {name: 'userTest', password: '123456', confirmPassword: '123456'}
            const response = await request(app).post('/users').send(newUser)
            expect(response.statusCode).toBe(400)
        })
        it('must return status 400 when password is missing', async()=>{
            const newUser = {name: 'userTest', email: 'user_test@email.com', confirmPassword: '123456'}
            const response = await request(app).post('/users').send(newUser)
            expect(response.statusCode).toBe(400)
        })
        it('must return status 400 when passwords do not match', async()=>{
            const newUser = {name: 'userTest', email: 'user_test@email.com', password: '123456', confirmPassword: '123'}
            const response = await request(app).post('/users').send(newUser)
            expect(response.statusCode).toBe(400)
        })
    })
    describe('GET', ()=>{
        it.todo('return status')
        it.todo('errors')
    })
    describe('PUT', ()=>{
        it.todo('return status')
        it.todo('errors')
    })
    describe('DELETE', ()=>{
        it.todo('must return 204 when deleting', ()=>{
            
        })
        it.todo('errors')
    })
})