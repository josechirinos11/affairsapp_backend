const Empresa = require("../models/Empresa");
const Usuario = require("../models/Usuario");
require("dotenv").config({ path: "variables.env" });
const validarToken = require('../helpers/ValidarToken.helper');

const buscarEmpresasUsuario = async (_, { id, token }) => {
  const empresas = await Empresa.find({ id_Usuario: id });
  console.log(empresas);
  if (!empresas) {
    throw new Error("empresas no encontradas");
  }
  const tk = await validarToken.ValidarToken({ token });
  let listadoEmpresas = [];
  empresas.forEach( (e) => {
    if (tk.id === e.id_Usuario) {
      listadoEmpresas.push(e);
    } else {
      throw new Error("Empresa no pertenece a este usuario");
    }
  });

  return listadoEmpresas;
};

const buscarEmpresaID = async (_, { id, token }) => {
  const empresa = await Empresa.findById(id);
  if (!empresa) {
    throw new Error("empresas no encontradas");
  }
  
  const tk = await validarToken.ValidarToken({ token });

  if (tk.id === empresa.id_Usuario) {
    return empresa;
  } else {
    throw new Error("Empresa no pertenece a este usuario");
  }
};

const obtenerEmpresas = async (_, { token }) => {
  const empresas = await Empresa.find();
  const tk = await validarToken.validarToken({token});
  if (tk.id === empresas.id_Usuario) {
    return empresas;
  }
  return null;
};

const nuevaEmpresa = async (_, { input, token }) => {
  try {
    // Verificación de autenticación
    await validarToken.ValidarToken({token}).then( (tk) => {
      if(!tk.status) {
        throw new Error("La identidad de usuario no existe.");
      }
      // Buscar la empresa relacionada con el usuario
      const empresas = Empresa.find({
        id_Usuario: tk.id,
      });
      try {
        //guardarlo en la base de datos
        input.inicioFormal = input.inicioFormal | false;
        input.id_Usuario = tk.id;
        const newEmpresa = new Empresa(input);
        newEmpresa.save(); //guardando
        return newEmpresa;
      } catch (error) {
        console.log(error);
      }
  
      return empresas;
      } );
    } catch (error) {
      console.log(error);
      throw new Error("Ha ocurrido un error al crear una nueva empresa.");
    }
};

const actualizacionEmpresa = async (_, { input, token }) => {
  try {
    let myToken = '';
    await validarToken.ValidarToken({token}).then( (tk) => {
      if(!tk.status) {
        throw new Error("La identidad de usuario no existe.");
      }
      console.log(tk);
      myToken = tk;
    });
    const usr_admin = await Usuario.findById(myToken.id);
    const id_empresa = input.id;
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
    cambiosEmpresa = { ...input };
    const actualizaEmpresa = Empresa.findByIdAndUpdate(
      id_empresa,
      cambiosEmpresa,
      { new: true }
    );
    return actualizaEmpresa;

  } catch (error) {
    console.log(error)
  }

};

module.exports = {
  nuevaEmpresa,
  actualizacionEmpresa,
  buscarEmpresasUsuario,
  buscarEmpresaID,
  obtenerEmpresas,
};
