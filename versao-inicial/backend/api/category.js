const express = require('express')
const {existsOrError, notExistsOrError, equalsOrError} = require('./validation.js')
const db = require('../Database/db.js')

const router = express.Router()

router.get('/')
router.post('/')
router.update('/')