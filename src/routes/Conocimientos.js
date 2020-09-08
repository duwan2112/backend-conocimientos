const express = require("express");
const { check } = require("express-validator");
const auth = require("../config/auth");
const routes = express.Router();
const ConocimientosController = require("../controller/ConocimientosController");
const upload = require("../config/multer");
routes.post(
  "/",
  auth,
  upload.single('image'),
  ConocimientosController.AñadirConocimiento
);


routes.get("/", auth, ConocimientosController.ObtenerConocimientos);


routes.put('/:id',
auth,
ConocimientosController.EditarConocimiento)

routes.delete('/:id',
auth,
ConocimientosController.EliminarConocimiento)
 
module.exports = routes;
