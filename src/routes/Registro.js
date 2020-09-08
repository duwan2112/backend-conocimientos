const express = require("express");
const routes = express.Router();
const RegistroController = require("../controller/RegistroController");
const { check } = require("express-validator");

routes.post(
  "/",

  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("email", "El email es obligatorio").isEmail(),
  check("password", "Debe tener un minimo de 6 caracteres").isLength({
    min: 6,
  }),

  RegistroController.AñadirUsuario
);

module.exports = routes;
