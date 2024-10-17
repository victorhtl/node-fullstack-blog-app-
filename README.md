## NODEJS project

ports 8080 and 3000 should be free in your system
you need to have a instance of postgres and mongodb running locally

## How to Run this Project
- run `git clone`
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