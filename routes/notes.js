'use strict'

const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')
const auth = require('../middleware/authentication')

// api/xxx
// Creamos una nota
router.post('/',
    auth, // Middleware para autenticar a través del token del header 
    noteController.createNote
)

router.post('/all/',
    auth, // Middleware para autenticar a través del token del header 
    noteController.createAllNotes
)

// Obtenemos las notas
router.get('/:filter',
    auth, // Middleware para autenticar a través del token del header 
    noteController.getNotes
)

// Actualizar una nota vía ID
router.put('/:id',
    auth,
    noteController.updateNote
)

// Eliminar la nota
router.delete('/:id',
    auth,
    noteController.deleteNote
)

module.exports = router