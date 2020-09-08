
const Usuario = require('../model/Usuario')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtConfig} = require('../config/variables')
exports.LoginUsuario = async (req,res) => {
     const errores = validationResult(req)
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }
    const {email,password} = req.body
    try {
      let usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({msg: "Usuario no valido"})
        }

        const passwordCorrecta = await bcryptjs.compare(password,usuario.password)
        if(!passwordCorrecta){
          return  res.status(401).json({
                msg: 'Password no valida'
            })
        }
          
        const payload = {
            usuario: {id: usuario.id}
        }
        jwt.sign(payload,jwtConfig.secreta,{expiresIn:7200},(error,token)=>{
           if(error) throw error 
           return res.json({token})
        }) 

    } catch (error) {
        console.log(error)
        res.status(400).json({msg: error})
    }
}


exports.usuarioAutenticado = async (req,res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id)
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Hubo un error'
        })
    }
}