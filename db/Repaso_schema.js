const { gql } = require('apollo-server');
//Schema
const typeDefs = gql`
type Empresa {
    id: ID
    correo: String
}
type Usuario {
    id: ID
    correo: String 
}
type Token {
    token: String
}

input EmpresaInput {
    correo: String!
    password: String!
}

input UsuarioInput {
    correo: String!
    empresa: String!
    password: String!
}

input AutenticarAcceso {
    correo: String!
    password: String!
}
  
type Query {
    obtenerUsuario(token: String!):  Usuario
}

type Mutation {
        nuevaEmpresa(input: EmpresaInput) : Empresa
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticaciones(input: AutenticarAcceso) : Token
    }

`
module.exports = typeDefs

