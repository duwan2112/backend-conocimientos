const jwt = require('jsonwebtoken') 
const {jwtConfig} = require('./variables')

module.exports = (req,res,next) => {

   const token = req.header('x-auth-token') 
   if(!token){
      return res.status(401).json({msg: "no hay token"})
   }
    try {
        const cifrado = jwt.verify(token,jwtConfig.secreta)
        req.usuario = cifrado.usuario
        next()
    } catch (error) {
        res.status(401).json({msg: "token no valido"})
    }

}