const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

// @route   POST /api/auth/register
router.post('/register', authController.register);

// @route   POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
