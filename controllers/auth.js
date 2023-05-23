const Empresa = require("../models/Empresa");
const Usuario = require("../models/Usuario");

require("dotenv").config({ path: "variables.env" });

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//Funcion interna
const crearToken = (usuario, secreta, expiresIn) => {
  const { id, correo } = usuario;
  return jwt.sign({ id, correo }, secreta, { expiresIn });
};

const autenticarUsuario = async (_, { input }) => {
  const { correo, password } = input;

  //Verificar si el usuario existe
  const existeUsuario = await Usuario.findOne({ correo });
  if (!existeUsuario) {
    throw new Error("El correo No esta registrado");
  }

  // verificar si password es correctoooo
  const passwordCorrecto = await bcryptjs.compare(
    password,
    existeUsuario.password
  );
  if (!passwordCorrecto) {
    throw new Error("El password es Incorrecto");
  }

  //crear token
  return {
    token: crearToken(existeUsuario, process.env.SECRETA, "24h"),
    id_usuario_login: existeUsuario.id,
  };
};

const validarToken = async (_, { input }, ctx) => {
  const { token } = input;

  try {
    // Verificar el token utilizando la clave secreta
    const decoded = jwt.verify(token, process.env.SECRETA);

    // Si el token es válido, la verificación no lanzará ninguna excepción
    return true;
  } catch (error) {
    // Si ocurre un error al verificar el token, se considera inválido
    return false;
  }
};

const recuperarPassword = async (_, { input }, ctx) => {
  console.log(ctx);
  const { correo, token } = ctx.usuario;

  //crear token
  return token;
};
const renovarToken = async (_, { input }, ctx) => {
  const { correo } = ctx.usuario;

  //Verificar si el usuario existe
  const existeUsuario = await Usuario.findOne({ correo });
  if (!existeUsuario) {
    throw new Error("El correo No esta registrado");
  }

  //crear token
  return {
    token: crearToken(existeUsuario, process.env.SECRETA, "12h"),
  };
};

module.exports = {
  autenticarUsuario,
  validarToken,
  renovarToken,
  recuperarPassword,
};
