## NODEJS project

### Run

after cloning

- run `cd /backend`
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
`npm start`