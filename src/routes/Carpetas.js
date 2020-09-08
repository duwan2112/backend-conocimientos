const express = require("express");
const { check } = require("express-validator");
const auth = require("../config/auth");
const routes = express.Router();
const CarpetaController = require('../controller/CarpetaController')

routes.post(
  "/",
  auth,
  check('nombre','El Nombre es Obligatorio').not().isEmpty(),
  check('proyecto','El Id del Proyecto es Obligatorio').not().isEmpty(),
  CarpetaController.AñadirCarpeta
);

routes.get("/", auth, CarpetaController.ObtenerCarpeta);




routes.put('/:id',
auth,
CarpetaController.ActualizarCarpeta)

routes.delete('/:id',
auth,
CarpetaController.EliminarCarpeta)
  
module.exports = routes;
