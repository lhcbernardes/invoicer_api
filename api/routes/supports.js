const express = require('express');
const router = express.Router();
const controller = require('../controllers/supportsController')

router.get('/:userId', controller.getAll )

router.post('/:userId', controller.create)

router.get('/:userId/:supportId', controller.getOne )

router.put('/:userId/:supportId', controller.updateOne)

router.delete('/:userId/:supportId', controller.deleteOne)

module.exports = router;