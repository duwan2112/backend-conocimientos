
const {validationResult} = require("express-validator")
const Carpeta = require('../model/Carpeta') 
const Proyecto = require('../model/Proyecto')
exports.AñadirCarpeta = async (req,res) => {
    //Validando que llegue la informacion correcta
    const errores = validationResult(req)
    if(!errores.isEmpty())
    return res.status(400).json({errores: errores.array()})
    
      try{
          //Extraer datos 
            const {nombre,proyecto} = req.body
            
            //Validando que el proyecto exista
            const proyectoexiste = await Proyecto.findById(proyecto)
            if(!proyectoexiste) return res.status(404).json({msg: "No se encontro el proyecto"})
           
            //Validando que el usuario del proyecto sea el mismo que el logueado
             if(proyectoexiste.creador.toString() !== req.usuario.id)
             return res.status(404).json({msg: "No se encontro el proyecto"})
 
             //Cargando carpeta con los datos
            const carpeta = new Carpeta({nombre})
            carpeta.creador = proyecto

            //Guardando y devolviendo la carpeta 
            carpeta.save()
            res.json({carpeta})
            
      }catch(error){
        res.status(400).json({ msg: "Algo salio mal" });
      }
}


exports.ObtenerCarpeta = async (req,res) => {

    try {
         const {proyecto} = req.query
     //Validando si el proyecto existe
     const proyectoexiste = await Proyecto.findById(proyecto);
     if (!proyectoexiste) {
       return res.status(404).json({ msg: "Proyecto no encontrado" });
     }
     
 
     //revisar que sea valido el proyecto con el usuario
     if (proyectoexiste.creador.toString() !== req.usuario.id) {
       return res.status(401).json({ msg: "No autorizado" });
     }

       
     //Extraer Carpetas y enviandolas 
     const carpetas = await Carpeta.find({creador: proyecto})


     res.json({carpetas})
    } catch (error) {
        res.status(400).json({ msg: "Algo salio mal" });
    }
}

exports.ActualizarCarpeta = async (req,res) => {
    try {
        const {nombre,creador} = req.body

       //Buscar si existe la Carpeta 
       let carpetaexiste = await Carpeta.findById(req.params.id) 
       if(!carpetaexiste){
           return res.status(404).json({msg: "No existe la Carpeta"}) 
       }

       //Buscar el proyecto en la base de datos 
       const proyectoexiste = await Proyecto.findById(creador)
       if(!proyectoexiste){
         return res.status(401).json({msg: 'No autorizado'})
       }

       //Actualizar carpeta una nueva Carpeta 
       const nuevaCarpeta = {} 
       nuevaCarpeta.nombre = nombre
       
       carpetaexiste = await Carpeta.findOneAndUpdate({_id: req.params.id},nuevaCarpeta,{new: true})
       
       
       res.json("carpeta eliminada")
    } 
    catch (error) {
        res.status(400).json({ msg: "Algo salio mal" });
    }

}


exports.EliminarCarpeta = async (req,res) => {
    try {
        const {idProyecto} = req.query

        //Buscar si existe la Carpeta 
        let carpetaexiste = await Carpeta.findById(req.params.id) 
        if(!carpetaexiste){
            return res.status(404).json({msg: "No existe la Carpeta"}) 
        }
 
        //Buscar el proyecto en la base de datos 
        const proyectoexiste = await Proyecto.findById(idProyecto)
        if(!proyectoexiste){
          return res.status(401).json({msg: 'No autorizado'})
        }
        //Eliminar Carpeta 
         await Carpeta.findOneAndRemove({_id : req.params.id})
         res.json({msg: "Carpeta Eliminada"})
    } catch (error) {
        res.status(400).json({ msg: "Algo salio mal" });
    }
}



