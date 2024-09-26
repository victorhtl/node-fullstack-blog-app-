# Backend documentation
All posts must be made in JSON format

## Run backend
- cd /backend
- npm i
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
