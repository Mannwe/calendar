'use strict'

const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

// Creamos el servidor
const app = express()

// Conectar a la bbdd
connectDB()

// Habilitar cors
app.use(cors())

// Habilitar express.json
app.use(express.json({ extended: true })) // Con esta instrucción hay que enviar el header de la petición como application/json

const PORT = process.env.PORT || 4000

// Importar rutas
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/authentication'))
app.use('/api/notes', require('./routes/notes'))

// Arrancamos el servidor (app)
app.listen(PORT, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
})
