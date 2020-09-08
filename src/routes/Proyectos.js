const express = require("express");
const { check } = require("express-validator");
const auth = require("../config/auth");
const routes = express.Router();
const ProyectoController = require("../controller/ProyectoController");
routes.post(
  "/",
  auth,
  check("nombre", "El Nombre es obligatorio").not().isEmpty(),
  ProyectoController.AñadirProyecto
);

routes.get("/", auth, ProyectoController.ObtenerProyectos);

routes.put(
  "/:id",
  auth,
  check("nombre", "El Nombre es obligatorio").not().isEmpty(),
  ProyectoController.ActualizarProyectos
);

routes.delete("/:id", auth, ProyectoController.EliminarProyecto);

module.exports = routes;
