require("dotenv").config();
const express = require("express");
const app = express();
const { appConfig, cloudinaryConfig } = require("./config/variables");
const conectarDB = require("./config/db");
const cors = require("cors");
const cloudinary = require("cloudinary");

//Activando Cloudinary
cloudinary.config({
  cloud_name: cloudinaryConfig.name,
  api_key: cloudinaryConfig.key,
  api_secret: cloudinaryConfig.secret,
});

//Activando cors
app.use(cors());

//Conectando db
conectarDB();

//Activando body
app.use(express.json({ extended: true }));

//Rutas
app.use("/api/registro", require("./routes/Registro"));
app.use("/api/login", require("./routes/Login"));
app.use("/api/proyectos", require("./routes/Proyectos"));
app.use("/api/conocimientos", require("./routes/Conocimientos"));
app.use("/api/carpetas", require('./routes/Carpetas'))

//Puerto
app.listen(appConfig.port, () => {
  console.log(`listen on ${appConfig.port}`);
});
