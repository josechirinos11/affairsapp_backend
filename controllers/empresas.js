const Empresa = require("../models/Empresa");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
require("dotenv").config({ path: "variables.env" });

const nuevaEmpresa = async (_, { input }, ctx) => {
  //aplicamos destrocturing

  const { correo, password } = input;
  // tener a mano los datos del usuario
  const usuario = await Usuario.findById(ctx.usuario.id);
  const empresa = await Empresa.find({ _idUsuario: usuario.id });
  const cadena = empresa.length;

  console.log(usuario.correo);
  console.log(cadena);

  const x = empresa[0].inicioFormal;
  console.log(x);
  console.log(usuario.correo);
  usuario.correo;

  if (x === false && cadena === 1) {
    console.log("se modificara tu primera empresa");

    //hashear su password
    const salt = await bcryptjs.genSaltSync(10);
    input.password = await bcryptjs.hashSync(password, salt);

    input.inicioFormal = true;
    cambiosEmpresa = { ...input };
    console.log(cambiosEmpresa);
    const actualizaEmpresa = await Empresa.findOneAndUpdate( usuario.correo, cambiosEmpresa, { new: true } );
    return actualizaEmpresa;
  } else {
    console.log("se creara tus siguiente empresa");

    // verificar si no esta registrado la empresa
    //   const emp = await Empresa.findOne({ correo });
    //           if (emp) {
    //   throw new Error("El correo ya esta registrado");
    //        }
    //hashear su password
    const salt = await bcryptjs.genSaltSync(10);
    input.password = await bcryptjs.hashSync(password, salt);

    //guardarlo en la base de datos

    try {
      //guardarlo en la base de datossss
      input.inicioFormal = true;
      input._idUsuario = usuario.idString;
      const newEmpresa = new Empresa(input);
      newEmpresa.save(); //guardando
      return newEmpresa;
    } catch (error) {
      console.log(error);
    }
  }

  return "obj";

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
  const actualizaEmpresa = await Empresa.findByIdAndUpdate( id_empresa, cambiosEmpresa, { new: true });
  return actualizaEmpresa;
};

module.exports = {
  nuevaEmpresa,
  actualizacionEmpresa,
};
