# Backend documentation
All posts must be made in JSON format

This projects needs mongodb and postgresql running somewhere

The API is protected with JWT. You need to authenticate with the following routes in order to get your token `/signin` `/signup`

only admins can create admins users. In first time creating an admin, comment the line

## Run backend
- cd /backend
- npm i
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
- knex migrate:latest
- npm start

## Features

### Articles
- GET /articles
- GET /articles/id
- POST /articles
    - name: string
    - description: string
    - userId: integer. This userId must exist in the database
    - categoryId: integer. This categoryId must exist in the database
    - content: string
- DEL /articles/id
- PUT /articles
    - id: integer. Article Id
    - name: string
    - description: string
    - userId: integer. This userId must exist in the database
    - categoryId: integer. This categoryId must exist in the database
    - content: string
