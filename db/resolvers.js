const {
  nuevaEmpresa,
  actualizacionEmpresa,
  buscarEmpresasUsuario,
  buscarEmpresaID,
} = require("../controllers/empresas");
const { autenticarUsuario, validarToken } = require("../controllers/auth");
const {
  obtenerUsuario,
  nuevoUsuario,
  actualizarUsuario,
  buscarUsuariCorreo,
} = require("../controllers/usuarios");
const {
  nuevoProducto,
  actualizarProducto,
} = require("../controllers/productos");
require("dotenv").config({ path: "variables.env" });
const jwt = require("jsonwebtoken");

//Resolvers
const resolvers = {
  Query: {
    obtenerUsuario,
    buscarEmpresasUsuario,
    buscarEmpresaID,
  },
  Mutation: {
    nuevaEmpresa,
    actualizacionEmpresa,
    nuevoUsuario,
    actualizarUsuario,
    autenticarUsuario,
    validarToken,
    nuevoProducto,
    actualizarProducto,
    buscarUsuariCorreo,
  },
};
module.exports = resolvers;
