const express = require('express');
const isAuth = require('../middleware/is-auth');
const businessController = require('../controllers/business');

const router = express.Router();

router.post('/create', businessController.business_create_msg);

router.get('/', isAuth.verifyJWT, businessController.business_get_all);

module.exports = router;