## NODEJS project

ports 8080 and 3000 should be free in your system
you need to have a instance of postgres and mongodb running locally

This project was built using Node v20.15.0

## How to Run this Project
- run `git clone git@github.com:victorhtl/node-fullstack-blog-app-.git`
- run `cd node-fullstack-blog-app-`
### Run backend

- run `cd backend`
- run `npm i`
- create a .env file:
```
AUTHSECRET ='really difficult secret'

PGCLIENT='your pg client'
PGPORT=5432
PGDATABASE='your database name'
PGUSER='your username'
PGPASSWORD='your password'

MONGOURL='mongodb://localhost:27017/test'
```
- run `npx knex migrate:latest`
- run `npm start`
### Run Frontend
- run `cd frontend`
- run `npm i`
- run `npm run serve`
- Access your application by entering localhost:8080 in your browser
- In order to create an admin user, you will need to create directly into the database, or using postman

URL: localhost:3000/signup
```json
{
    "name": "silva",
    "email": "silva@gmail.com",
    "password": "123456",
    "confirmPassword": "123456",
    "admin": true
}
```
