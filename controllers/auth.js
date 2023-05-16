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

  //verificacion de autenticacion
  if (Object.keys(ctx).length === 0) {
    throw new Error("Antes debe iniciar sesión");
  }
  //verificacion de si el imput es igual al token
  if (token === ctx.usuario.token) {
    throw new Error("verdadero");
  }

  throw new Error("falso");
};

const renovarToken = async (_, { input }, ctx) => {
  const { correo } = ctx.usuario;
  const { HH } = input;

  //Verificar si el usuario existe
  const existeUsuario = await Usuario.findOne({ correo });
  if (!existeUsuario) {
    throw new Error("El correo No esta registrado");
  }

  //crear token
  return {
    token: crearToken(existeUsuario, process.env.SECRETA, `${HH}h`),
  };
};

module.exports = {
  autenticarUsuario,
  validarToken,
  renovarToken,
};
