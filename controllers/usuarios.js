const Usuario = require("../models/Usuario");
const Empresa = require("../models/Empresa");
const bcryptjs = require("bcryptjs");
require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");

const obtenerUsuario = async (_, { token }) => {
  const usuarioId = await jwt.verify(token, process.env.SECRETA);
  const usr = await Usuario.findById(usuarioId.id);

  const { id, correo, rol } = usr;

  return { id, correo, rol };
};

const nuevoUsuario = async (_, { input }, validacion) => {
  //aplicamos destrocturing
  const { correo, password } = input;

  // verificar si no esta registrado el usuario
  const existeUsuario = await Usuario.findOne({ correo });
  if (existeUsuario) {
    throw new Error("Ha ocurrido un error al procesar los datos.");
  }
  //hashear su password
  const salt = await bcryptjs.genSaltSync(10);
  input.password = await bcryptjs.hashSync(password, salt);
  input.rol = "admin_usuario";
  //guardarlo en la base de datos
  try {
    //guardarlo en la base de datos

    const usuario = new Usuario(input);
    usuario.save(); //guardando

    input.id_Usuario = usuario._id;
    const empresa = new Empresa(input);
    empresa.save(); //guardando

    return usuario;
  } catch (error) {
    console.log(error);
  }
};

const actualizarUsuario = async (_, { input }, validacion) => {
  if (Object.keys(validacion).length === 0) {
    throw new Error("Antes debe iniciar sesión");
  }

  // verificamos si se actualiza password para hashear
  // solo para confirmar ese cambio en actualizacion
  if (input.condicion == "cambio-password") {
    if (input.password === input.password_Repeat) {
      const { password } = input;
      const salt = await bcryptjs.genSaltSync(10);
      input.password = await bcryptjs.hashSync(password, salt);

      /**
       * IMPORTANTE:
       * Un usuario con rol de admin, puede editar los datos propios y además los datos de cualquier otro usuario
       * Un usuario con rol distinto de admin, solo puede editar sus propios datos
       */

      const usuario_login = validacion.usuario.id; //Este es el usuario logueado
      const id_usuario = input.id; //Este es el id del usuario a editar
      const existeUsuario = await Usuario.findById(id_usuario);
      const usr = await Usuario.findById(usuario_login);

      if (!existeUsuario) {
        throw new Error("Usuario no existe en la Base de datos");
      }

      if (!usr.rol) {
        throw new Error(
          "Usuario no posee rol. Comuníquese con el administrador."
        );
      }

      // Se evalúa usuario admin o el mismo usuario.
      if (usr.rol !== "admin_usuario" && usuario_login !== id_usuario) {
        throw new Error(
          "Usted no cuenta con los permisos necesarios para realizar esta operación"
        );
      }

      if (!input.empresa || input.empresa == "") {
        input.empresa = existeUsuario.empresa;
      }

      const cambiosUsuario = {
        ...input,
      };

      const actualizacionUsuario = await Usuario.findByIdAndUpdate(
        id_usuario,
        cambiosUsuario,
        { new: true }
      );
      return actualizacionUsuario;
    }
    throw new Error("Las Claves tienen que ser iguales");
  }
};

const buscarUsuariCorreo = async (_, { input }, validacion) => {
  console.log(input);
  const { correo } = input;
  console.log(correo);
  const existeUsuario = await Usuario.findOne({ correo: correo });
  if (!existeUsuario) {
    console.log("no existe");
    throw new Error("Usuario no esta");
  }

  return existeUsuario;
};

const buscarUsuarioId = async (_, { input }, validacion) => {
  console.log(input);
  const { correo } = input;
  console.log(correo);
  const existeUsuario = await Usuario.findOne({ correo: correo });
  if (!existeUsuario) {
    console.log("no existe");
    throw new Error("Usuario no esta");
  }

  return existeUsuario;
};

module.exports = {
  nuevoUsuario,
  obtenerUsuario,
  actualizarUsuario,
  buscarUsuariCorreo,
  buscarUsuarioId,
};
