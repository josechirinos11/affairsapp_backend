
const { nuevaEmpresa, actualizacionEmpresa } = require('../controllers/empresas');
const {  autenticarUsuario } = require('../controllers/auth');
const { obtenerUsuario, nuevoUsuario, actualizarUsuario, buscarUsuariCorreo } = require('../controllers/usuarios');
const { nuevoProducto, actualizarProducto } = require('../controllers/productos');
require('dotenv').config({ path: 'variables.env' })
const jwt = require('jsonwebtoken')

//Resolvers
const resolvers = {
    Query: {
        obtenerUsuario
    },
    Mutation: {
        nuevaEmpresa, actualizacionEmpresa,
        nuevoUsuario,  actualizarUsuario,
        autenticarUsuario,
        nuevoProducto, actualizarProducto, 
        buscarUsuariCorreo

    }
}
module.exports = resolvers