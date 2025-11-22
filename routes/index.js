const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/courses', require('./courses'));
router.use('/students', require('./students'));

module.exports = router;