const router = require('express').Router();
const { getMe } = require('../controllers/user');

router.get('/me', getMe);

module.exports = router;
