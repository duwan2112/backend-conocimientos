const mongoose = require('mongoose') 
const CarpetaSchema = mongoose.Schema({

      nombre:{
          type: String,
          required: true,
          trim: true
      },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    registro:{
        type: Date,
       default: Date.now()
    }



     
}) 


module.exports = mongoose.model('Carpeta',CarpetaSchema)