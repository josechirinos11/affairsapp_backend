const {
  nuevaEmpresa,
  actualizacionEmpresa,
  buscarEmpresasUsuario,
  buscarEmpresaID,
} = require("../controllers/empresas");
const {
  autenticarUsuario,
  validarToken,
  renovarToken,
  recuperarPassword,
} = require("../controllers/auth");
const {
  obtenerUsuario,
  nuevoUsuario,
  actualizarUsuario,
  buscarUsuarioId,
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
    renovarToken,
    recuperarPassword,
    nuevoProducto,
    actualizarProducto,
    buscarUsuarioId,
    buscarUsuariCorreo,
  },
};
module.exports = resolvers;
