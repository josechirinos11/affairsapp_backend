const Empresa = require("../models/Empresa");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
require("dotenv").config({ path: "variables.env" });

const buscarEmpresasUsuario = async (_, { id }, ctx) => {
  const empresas = await Empresa.find({ _idUsuario: id });
  if (!empresas) {
    throw new Error("empresas no encontradas");
  }
  return empresas;
};

const buscarEmpresaID = async (_, { id }, ctx) => {
  const empresa = await Empresa.findById(id);
  if (!empresa) {
    throw new Error("empresas no encontradas");
  }

  if (ctx.usuario.id === empresa._idUsuario) {
    console.log("son iguales");
    return empresa;
  } else {
    throw new Error("No tienes credenciales");
  }
};

const nuevaEmpresa = async (_, { input }, ctx) => {
  console.log(ctx);
  try {
    // Verificación de autenticación
    if (!ctx.usuario) {
      throw new Error("Debe iniciar sesión antes de crear una nueva empresa.");
    }

    const usr_admin = await Usuario.findById(ctx.usuario.id);
    if (!usr_admin) {
      throw new Error("La identidad de usuario no existe.");
    }

    // Buscar la empresa relacionada con el usuario
    const empresas = await Empresa.find({
      id_Usuario: ctx.usuario.id,
    });

    /*
    // verificando cuantas empresas tienes
    if (empresas.length === 1) {
      console.log("Tiene una empresa");
    } else if (empresas.length > 1) {
      console.log("Tiene más de una empresa");
    } else {
      console.log("No tiene empresas");
    }
    */

    try {
      //guardarlo en la base de datossss
      input.inicioFormal = false;
      input.id_Usuario = usr_admin.id;
      const newEmpresa = new Empresa(input);
      newEmpresa.save(); //guardando
      return newEmpresa;
    } catch (error) {
      console.log(error);
    }

    return empresas;
  } catch (error) {
    console.log(error);
    throw new Error("Ha ocurrido un error al crear una nueva empresa.");
  }

  /*

  if (Object.keys(empresas).length === 1) {
    return console.log("Tiene una empresa");
  } else if (Object.keys(empresas).length > 1) {
    return console.log("Tiene más de una empresa");
  } else {
    return console.log("No tiene empresas");
  }

  //aplicamos destrocturing
 
  try {
    //guardarlo en la base de datossss
    input.inicioFormal = false;
    input.id_Usuario = usr_admin.id;
    const newEmpresa = new Empresa(input);
    newEmpresa.save(); //guardando
    return newEmpresa;
  } catch (error) {
    console.log(error);
  }

  return "obj";
*/

  //const numEmp = Object.keys(emp).length
  //console.log(numEmp)
};

const actualizacionEmpresa = async (_, { input }, ctx) => {
  console.log(ctx.usuario.id);

  if (Object.keys(ctx).length === 0) {
    throw new Error("Antes debe iniciar sesión");
  }
  const id_empresa = input.id;
  const usr_admin = await Usuario.findById(ctx.usuario.id);

  const existeEmpresa = await Empresa.findById(id_empresa);
  //Lo primero es encontrar la empresa por su ID
  // verificar si no esta registrado la empresa
  if (!existeEmpresa) {
    throw new Error("La empresa no existe");
  }

  //Verificar que cuente con los permisos necesarios
  if (!usr_admin.rol || usr_admin.rol != "admin_usuario") {
    throw new Error(
      "Usted no cuenta con los permisos necesarios para realizar esta operación"
    );
  }

  // buscamos la empresa

  cambiosEmpresa = { ...input };
  const actualizaEmpresa = await Empresa.findByIdAndUpdate(
    id_empresa,
    cambiosEmpresa,
    { new: true }
  );
  return actualizaEmpresa;
};

module.exports = {
  nuevaEmpresa,
  actualizacionEmpresa,
  buscarEmpresasUsuario,
  buscarEmpresaID,
};
