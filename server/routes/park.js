const express = require('express');
const isAuth = require('../middleware/is-auth');
const parkController = require('../controllers/park');

const router = express.Router();

router.post('/create', isAuth.verifyJWT, parkController.park_create_park);

router.get('/', isAuth.verifyJWT, parkController.park_get_all);

router.get('/one', isAuth.verifyJWT, parkController.park_get_one);

router.post('/search', parkController.park_search_one)

module.exports = router;