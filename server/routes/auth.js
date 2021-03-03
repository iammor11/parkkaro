const express = require('express');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/login', authController.postLogin);

router.post('/signup', authController.postSignup);

router.post('/reset', authController.postReset);

router.patch('/reset/:token', authController.postNewPassword);

router.patch('/verify/:token', authController.verify)

router.get('/getAll', isAuth.verifyJWT, authController.getAllUsers);

module.exports = router;