'use strict'

const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.authenticateUser = async (req, res) => {

    // Extraemos el email y password del request
    const { email, password } = req.body
    
    try {
        // Validamos que el usuario esté registrado
        const user = await User.findOne({ email })
        if(!user){
            return res.status(404).send({ msg: 'El usuario no existe' })
        }

        // Validamos que el password sea correcto
        const passwordOk = await bcryptjs.compare(password, user.password)
        if(!passwordOk){
            return res.status(400).send({ msg: 'La contraseña es incorrecta '})
        }

        // Si todo es correcto, creamos el token
        // Hashear el password
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hashSync(password, salt)

        // Creamos el jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        // Firmar el jwt
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error){
                throw error
            }
             // Mensaje de confirmación
            res.status(200).json({ token })
        }) 
        
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: 'Hubo un error' })
    }
    
}