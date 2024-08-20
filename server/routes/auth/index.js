
const express = require('express');
const router = express.Router();

router.use('/api/login', require('./login'));
router.use('/api/register', require('./register'));

module.exports = router;