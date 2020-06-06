'use strict'

const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {

    // Extraer e-mail y password
    const { email, password } = req.body

    try {
        // Revisar que el usuario sea único
        let user = await User.findOne({ email })

        if(user){
            return res.status(400).json({ msg: 'El usuario ya existe '})
        }

        // Crear el nuevo usuario
        user = new User(req.body)

        // Hashear el password
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hashSync(password, salt)

        // Guardar el usuario
        await user.save()

        // Creamos el jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        // Firmar el jwt
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 604800 // 1 semana
        }, (error, token) => {
            if(error){
                throw error
            }
             // Mensaje de confirmación
            res.status(200).json({ token })
        })       
    } catch (error) {
        console.log(error)
        res.status(500).send('Se ha producido un error')
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password') // No devolemos el password
        res.status(200).json({user})
    } catch (error) {
        console.log(error)
        res.status(500).send('Se ha producido un error')
    }
}
