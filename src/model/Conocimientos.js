const mongoose = require('mongoose') 
const ConocimientosSchema = mongoose.Schema({
      nombre:{
          type: String,
          required: true,
          trim: true
      },
     descripcion:{
        type: String,
        required: true,
        trim: true
     },
     imageUrl:{
        type: String,
        required: true,
        trim: true
     },
     imageUrlId:{
         type: String,
         required: true,
         trim: true
     },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    carpeta:{
       type: String
    },
    registro:{
        type: Date,
       default: Date.now()
    }    
}) 
module.exports = mongoose.model('Conocimiento',ConocimientosSchema)