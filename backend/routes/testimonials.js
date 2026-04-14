const express = require('express')
const router = express.Router()
const c = require('../controllers/testimonialController')

router.get('/', c.getApproved)
router.post('/', c.submit)
router.get('/all', c.getAll)
router.patch('/:id/status', c.updateStatus)
router.delete('/:id', c.remove)

module.exports = router
