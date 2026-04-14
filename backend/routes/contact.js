const express = require('express')
const router = express.Router()
const c = require('../controllers/contactController')

router.post('/', c.submit)
router.get('/', c.getAll)

module.exports = router