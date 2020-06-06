'use strict'

const Note = require('../models/Note')

exports.createNote = async (req, res) => {
    try {
        // Crear una nueva nota
        const note = new Note(req.body)

        // Guardamos el usuario vía jsonwebtoken
        note.userId = req.user.id

        // Guardamos el proyecto
        await note.save()
        res.json(note)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Se ha producido un error '})
    }
}

exports.createAllNotes = (req, res) => {
    try {
        // Recorremos el array de notas para añadir
        const notes = req.body
        const newNotes = notes.map(note => {

            let newNote = new Note()
            newNote.type = note.type
            newNote.text = note.text
            newNote.calendarDate = note.calendarDate
            newNote.userId = req.user.id // Guardamos el usuario vía jsonwebtoken

            // Guardamos la nota
            newNote.save()

            return newNote
        })
        
        res.json(newNotes)
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Se ha producido un error'})
    }
}

// Obtiene todas las notas del usuario actual
exports.getNotes = async (req, res) => {
    try {
        // Recuperamos el id del usuario
        const userId = req.user.id

        // Leemos los registros de notas de ese usuario
        const notes = await Note.find({ userId }).find({'calendarDate': req.params.filter})
        res.status(200).send({ notes })       
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Se ha producido un error'})
    }
}

// Actualiza una nota
exports.updateNote = async (req, res) => {
    const { type, calendarDate, text, completed } = req.body
    const newNote = {}

    if(type){
        newNote.type = type
    }
    if(calendarDate){
        newNote.calendarDate = calendarDate
    }
    if(text){
        newNote.text = text
    }

    newNote.completed = completed

    try {
        // Validamos el Id
        let note = await Note.findById(req.params.id)

        // Validamos si la note existe
        if(!note){
            return res.status(404).json({ msg: 'Nota no encontrada '})
        }

        // Validar el usuario
        if(note.userId.toString() !== req.user.id){
            return res.status(500).json({ msg: 'Error en la autenticación del usuario' })
        }

        // Actualizar
        note = await Note.findByIdAndUpdate({_id: req.params.id}, {$set: newNote }, {new: true})
        res.status(200).json({ note })

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Se ha producido un error' })
    }
}

// Eliminar la nota
exports.deleteNote = async (req, res) => {
    try {
        // Validamos la id
        let note = await Note.findById(req.params.id)

        // Validamos que la nota existe
        if(!note){
            return res.status(404).json({ msg: 'Nota no encontrada' })
        }

        // Validar el usuario
        if(note.userId.toString() !== req.user.id){
            return res.status(500).json({ msg: 'Error en la autenticación del usuario' })
        }

        await Note.findByIdAndRemove({ _id: req.params.id})
        res.status(200).json({ msg: 'Proyecto eliminado '})

        // Eliminar

    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Se ha producido un error' })
    }
}