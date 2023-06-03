const nodemailer = require("nodemailer");
const Empresa = require("../models/Empresa");
const Usuario = require("../models/Usuario");

require("dotenv").config({ path: "variables.env" });

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
// funcion para recuperar contraseña
const generarCodigo = () => {
  const codigo = Math.floor(10000 + Math.random() * 90000); // Generar un número aleatorio de 5 dígitos

  const ahora = new Date(); // Obtiene la marca de tiempo actual
  const tresHorasDespues = new Date(ahora.getTime() + 3 * 60 * 60 * 1000); // Suma 3 horas a la marca de tiempo actual

  const codigoRecuperacion = {
    codigo: codigo.toString(),
    expira: tresHorasDespues.toISOString(), // Convierte la marca de tiempo a formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ)
  };

  // return codigo.toString(); // Convertir el número a cadena de texto
  return codigoRecuperacion;
};
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
    const { id, correo } = decoded;

    console.log(id);
    console.log(correo);
    // Si el token es válido, la verificación no lanzará ninguna excepción
    return {
      status: true,
      id,
      correo,
    };
  } catch (error) {
    // Si ocurre un error al verificar el token, se considera inválido
    return {
      status: false,
      id: null,
      correo: null,
    };
  }
};

const recuperarPassword = async (_, { input }, ctx) => {
  const { correo } = input;

  // verificar si no esta registrado la empresa
  const existeUsuario = await Usuario.findOne({ correo });
  if (!existeUsuario) {
    throw new Error("correo no existe");
  }
  const idUsuario = existeUsuario._id.toString();

  const generar = generarCodigo();
  const codigoRecuperacion = generar.codigo;
  const fechaExpiracion = generar.expira;

  console.log(codigoRecuperacion);
  console.log(fechaExpiracion);
  console.log(idUsuario);

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "mail.proinex.cl",
    port: 465,
    secure: true, // Utiliza SSL/TLS
    auth: {
      user: process.env.CORREO, // Tu dirección de correo electrónico
      pass: process.env.PASSWORD, // Tu contraseña de correo electrónico
    },
  });

  const urlRecuperacion = `https://affairsapp/recuperacion-contrasena/${codigoRecuperacion}`;

  // Configuración del correo electrónico
  const mailOptions = {
    from: process.env.CORREO, // Correo electrónico de origen (tu cuenta de Gmail)
    to: correo, // Correo electrónico de destino
    subject: "Recuperación de contraseña", // Asunto del correo
    text: `Hola, has solicitado recuperar tu contraseña. tu codigo es: ${codigoRecuperacion}`,
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado:", info.response);
    }
  });

  return { codigoRecuperacion, idUsuario, fechaExpiracion };
};
const validarCorreo = async (_, { input }, ctx) => {
  const { correo } = input;

  const generar = generarCodigo();
  const codigoRecuperacion = generar.codigo;
  const fechaExpiracion = generar.expira;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "mail.proinex.cl",
    port: 465,
    secure: true, // Utiliza SSL/TLS
    auth: {
      user: process.env.CORREO, // Tu dirección de correo electrónico
      pass: process.env.PASSWORD, // Tu contraseña de correo electrónico
    },
  });

  const urlRecuperacion = `https://affairsapp/recuperacion-contrasena/${codigoRecuperacion}`;

  // Configuración del correo electrónico
  const mailOptions = {
    from: process.env.CORREO, // Correo electrónico de origen (tu cuenta de Gmail)
    to: correo, // Correo electrónico de destino
    subject: "Recuperación de contraseña", // Asunto del correo
    text: `Hola, has solicitado recuperar tu contraseña. tu codigo es: ${codigoRecuperacion}`,
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado:", info.response);
    }
  });

  return { codigoRecuperacion, fechaExpiracion };
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
  validarCorreo,
};
