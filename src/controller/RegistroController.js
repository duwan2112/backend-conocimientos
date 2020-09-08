
const Usuario = require('../model/Usuario')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {jwtConfig} = require('../config/variables')
exports.AñadirUsuario = async (req,res) => {
     const errores = validationResult(req)
     if(!errores.isEmpty()){
         return res.status(400).json({errores: errores.array()})
     }
    const {email,password} = req.body
    try {
        let usuario = await Usuario.findOne({email})
        if(usuario){
            return res.status(400).json({msg: "Email ya existe, Ingresa uno diferente"})
        }
        usuario = new Usuario(req.body)
        const salt = await bcryptjs.genSalt(10)
        usuario.password = await bcryptjs.hash(password,salt)

        await usuario.save()
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