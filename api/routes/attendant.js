const express = require('express');
const router = express.Router();
const controller = require('../controllers/attendantsController')

router.get('/:userId', controller.getAll )

router.post('/:userId', controller.create)

router.get('/:userId/:attendantId', controller.getOne )

router.put('/:userId/:attendantId', controller.updateOne)

router.delete('/:userId/:attendantId', controller.deleteOne)

module.exports = router;