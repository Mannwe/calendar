'use strict'

// Rutas para crear usuarios
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/authentication')

// api/xxx
// Crea un usuario 
router.post('/',
    userController.createUser
)

// Obtiene el usuario
router.get('/',
    auth,
    userController.getUser
)

module.exports = router