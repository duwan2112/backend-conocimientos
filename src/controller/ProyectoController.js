const {validationResult} = require('express-validator')
const Proyecto = require('../model/Proyecto')
const Carpete = require('../model/Carpeta')
const Conocimiento = require('../model/Conocimientos')
const Carpeta = require('../model/Carpeta')
const { findByIdAndRemove } = require('../model/Proyecto')
exports.AñadirProyecto= async (req,res) => {
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    try {

       const proyecto = new Proyecto(req.body)
       proyecto.creador = req.usuario.id
       proyecto.save()
       res.json(proyecto)    
    } catch (error) {
        res.status(400).json({
            msg: "Algo Fallo"
        })
    }
    
}

exports.ObtenerProyectos = async (req,res) => {
  try {
      const proyectos = await Proyecto.find({creador: req.usuario.id})
      res.json({proyectos})
  } catch (error) {
    res.status(400).json({
        msg: "Algo Fallo"
    })
  }
}


exports.ActualizarProyectos = async (req,res) => {
    
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    const{nombre} = req.body 
    const nuevoProyecto = {}
    if(nombre){
        nuevoProyecto.nombre = nombre
    }
   
    try {
        
      let proyecto = await Proyecto.findById(req.params.id)
      if(!proyecto){
         return res.status(404).json({msg: "Proyecto no encontrado"}) 
      }


      if(proyecto.creador.toString() !== req.usuario.id){
       return  res.status(401).json({msg: "No autorizado"})
      }

      proyecto = await Proyecto.findByIdAndUpdate({_id: req.params.id},{$set: nuevoProyecto},{new: true})
      res.json({proyecto})


    } catch (error) {
        res.status(400).json({
            msg: "Algo Fallo"
        })
    }
}


exports.EliminarProyecto = async (req,res) => {
    
    try {
        
      let proyecto = await Proyecto.findById(req.params.id)
      if(!proyecto){
         return res.status(404).json({msg: "Proyecto no encontrado"}) 
      }


      if(proyecto.creador.toString() !== req.usuario.id){
       return  res.status(401).json({msg: "No autorizado"})
      }

     await Proyecto.findOneAndRemove({_id: req.params.id})
     await Carpeta.deleteMany({creador: req.params.id})
     await Conocimiento.deleteMany({creador: req.params.id})
     
      res.json({msg: "Proyecto Eliminado"})


    } catch (error) {
        res.status(400).json({
            msg: "Algo Fallo"
        })
    }
}



