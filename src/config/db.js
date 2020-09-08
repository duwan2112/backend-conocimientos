const mongoose = require('mongoose') 
const { mongoUrl } = require('./variables')



const conectarDB = async () => {

     try {
         await mongoose.connect(mongoUrl.url,{
             useNewUrlParser: true,useFindAndModify:false,useUnifiedTopology:true
         })
         console.log("Conectada DB")
     } catch (error) {
         console.log(error)
     }

}


module.exports = conectarDB