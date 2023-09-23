const express = require('express');
const router = express.Router();
const User = require('../models/user');
const app = express();

router.post('/login', /* ... */);
router.post('/signup', /* ... */);

module.exports = router;