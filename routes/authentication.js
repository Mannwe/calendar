'use strict'

// Rutas para autenticar el usuario loginado
const express = require('express')
const router = express.Router()
const auth = require('../middleware/authentication');
const authController = require('../controllers/authController')

// /api/xxx
// Autenticamos el usuario
router.post('/',
    authController.authenticateUser
)

module.exports = router