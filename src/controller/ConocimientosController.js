const Conocimiento = require("../model/Conocimientos");
const Proyecto = require("../model/Proyecto");
const cloudinary = require("cloudinary");
const fs = require("fs-extra");
exports.AñadirConocimiento = async (req, res) => {
  //Extraemos el id del proyecto
  const { proyecto ,carpeta} = req.body; 
  try {
    //Comprobando que el proyecto existe
    const proyectoexiste = await Proyecto.findById(proyecto);
    if (!proyectoexiste) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //revisar que sea valido el proyecto con el usuario
    if (proyectoexiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //creamos el Conocimiento
    const conocimiento = new Conocimiento(req.body);
    //Cargando la imagen en cloudinary
    const resultado = await cloudinary.v2.uploader.upload(req.file.path);
    //Rellenando informacion referente a la imagen
    conocimiento.imageUrl = resultado.url;
    conocimiento.imageUrlId = resultado.public_id;

    //Rellenando la informacion del creador
    conocimiento.creador = proyecto;

   //Rellenar la informacion de la carpeta si existe 
   if(carpeta !== null){
      conocimiento.carpeta = carpeta
   }
  

    //Eliminando las imagenes de la carpeta public/uploads cuando ya no se necesitan
    await fs.unlink(req.file.path);

    //Guardando y enviando el proyecto
    conocimiento.save();
    res.json({ conocimiento });
  } catch (error) {
    res.status(400).json({ msg: "Algo salio mal, Asegurate de que todos los datos sean validos" });
  }
};

exports.ObtenerConocimientos = async (req, res) => {
  try {
    //Obtenemos el proyecto desde el query
    const { proyecto } = req.query;

    //Validando si el proyecto existe
    const proyectoexiste = await Proyecto.findById(proyecto);
    if (!proyectoexiste) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    //revisar que sea valido el proyecto con el usuario
    if (proyectoexiste.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //Extrayendo conocimientos y enviandolos
    const conocimientos = await Conocimiento.find({ creador: proyecto });
    res.json({ conocimientos });
  } catch (error) {
    res.status(400).json({ msg: "Algo salio mal" });
  }
};


exports.EditarConocimiento =async (req,res) => {
  try {
      //Extraer datos del body
      const {creador,nombre,descripcion} = req.body 

  
      //Buscar el conocimiento en base del id 
      let conocimientoExiste = await Conocimiento.findById(req.params.id)
      if(!conocimientoExiste){
        return res.status(404).json({msg: 'No Existe el conocimiento'})
      }

      //Buscar el proyecto en base de los datos extraidos
      const proyectoexiste = await Proyecto.findById(creador)
      if(!proyectoexiste){
        return res.status(401).json({msg: 'No autorizado'})
      }
     
      //Generando un nuevo Conocimiento
      const nuevoConocimiento = {} 
      nuevoConocimiento.nombre = nombre 
      nuevoConocimiento.descripcion = descripcion
     
      conocimientoExiste = await Conocimiento.findOneAndUpdate({_id: req.params.id},nuevoConocimiento,{new: true})

      res.json({conocimientoExiste})

  } catch (error) {
      res.status(400).json({msg: "Algo salio mal"})
  }
}


exports.EliminarConocimiento = async (req,res) => {
    try {
        //Extraer informacion del proyecto actual
       const {idProyecto} = req.query
    
     
       //Validar que el conocimiento existe
       let conocimientoExiste = await Conocimiento.findById(req.params.id)

       if(!conocimientoExiste){
        return res.status(404).json({msg: 'No Existe el conocimiento'})
      }
        //Buscar el proyecto en base de los datos extraidos
        const proyectoexiste = await Proyecto.findById(idProyecto)
        if(!proyectoexiste){
          return res.status(401).json({msg: 'No autorizado'})
        }


          //Eliminar el conocimiento de la base de datos
        await Conocimiento.findOneAndRemove({_id : req.params.id})

        //Eliminar la imagen del conocimiento en cloudinary 
         await cloudinary.v2.uploader.destroy(conocimientoExiste.imageUrlId)

        res.json({msg: "Conocimiento Eliminado"})
  
    } catch (error) {
     res.status(400).json({msg: "Algo salio mal"})
    }
}