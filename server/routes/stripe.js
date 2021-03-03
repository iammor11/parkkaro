const express = require('express');
const router = express.Router();

const paymentCon = require('../controllers/stripe');

router.post('/', paymentCon.my)

module.exports = router