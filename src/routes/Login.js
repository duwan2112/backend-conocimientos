const express = require("express");
const routes = express.Router();
const LoginController = require("../controller/LoginController");
const { check } = require("express-validator");
const auth = require("../config/auth");
routes.post(
  "/",
  check("email", "El email es obligatorio").isEmail(),
  check("password", "Debe tener un minimo de 6 caracteres").isLength({
    min: 6,
  }),

  LoginController.LoginUsuario
);

routes.get("/", auth, LoginController.usuarioAutenticado);

module.exports = routes;
