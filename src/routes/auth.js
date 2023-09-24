const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.get('/', controller.hello )

module.exports = router;