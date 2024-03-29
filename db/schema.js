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

${inputEmpresa}
${inputActualizacionEmpresa}
${inputUsuario}
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
