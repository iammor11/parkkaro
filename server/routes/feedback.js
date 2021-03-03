const express = require('express');
const feedbackController = require('../controllers/feedback');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post('/create', isAuth.verifyJWT, feedbackController.feedback_create_msg);

router.get('/', feedbackController.feedback_get_all);

router.get('/one', isAuth.verifyJWT, feedbackController.feedback_get_msg);

module.exports = router;