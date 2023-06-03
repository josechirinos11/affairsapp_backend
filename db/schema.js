const { gql } = require("apollo-server");

const {
  typeEmpresa,
  inputEmpresa,
  inputActualizacionEmpresa,
  mutationsEmpresa,
  queriesEmpresa,
} = require("./schemas/empresaSchema");
const {
  typeToken,
  typeCodigo,
  typeInfoToken,
  inputAutenticarAcceso,
  inputValidarToken,
  inputHoraToken,
  inputRecuperarPassword,
  queriesToken,
  mutationsToken,
} = require("./schemas/tokenSchema");
const {
  typeUsuario,
  inputUsuario,
  inputBuscandoID,
  ActualizarUsuario,
  queriesUsuario,
  mutationsUsuario,
} = require("./schemas/usuarioSchema");
const {
  typeProducto,
  inputProducto,
  queriesProducto,
  mutationsProducto,
} = require("./schemas/productoSchema");

//Schema
const typeDefs = gql`
${typeEmpresa}
${typeUsuario}
${typeProducto}
${typeToken}
${typeCodigo}
${typeInfoToken}

${inputEmpresa}
${inputActualizacionEmpresa}
${inputUsuario}
${inputBuscandoID}
${ActualizarUsuario}
${inputProducto}
${inputAutenticarAcceso}
${inputValidarToken}
${inputHoraToken}
${inputRecuperarPassword}
  
type Query {
    ${queriesEmpresa}
    ${queriesToken}
    ${queriesUsuario}
    ${queriesProducto}
}

type Mutation {
    ${mutationsEmpresa}
    ${mutationsUsuario}
    ${mutationsProducto}
    ${mutationsToken}
}
`;

module.exports = typeDefs;
