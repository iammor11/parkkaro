const express = require('express');
const isAuth = require('../middleware/is-auth');
const helpController = require('../controllers/help');

const router = express.Router();

router.post('/create', helpController.help_create_msg);

router.get('/', isAuth.verifyJWT, helpController.help_get_all);

module.exports = router;