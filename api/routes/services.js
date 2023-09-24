const express = require('express')
const router = express.Router()
const controller = require('../controllers/servicesController')


router.get('/:id', controller.getAll )

router.post('/:id', controller.create)

router.get('/:id', controller.getOne )

router.patch('/:id', controller.updateOne)

router.delete('/:id', controller.deleteOne)

module.exports = router