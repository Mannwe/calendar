const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // Leer el token del header
    const token = req.header('x-auth-token')

    // Validar si hay token
    if(!token){
        return res.status(401).json({ msg: 'No existe autenticación del usuario. No se ha podido conectar'})        
    }

    // Validar el token
    try {
        const encoding = jwt.verify(token, process.env.SECRET)
        req.user = encoding.user
        next()  // Para que vaya al siguiente middleware
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'Ha fallado la autenticación'})
    }
}