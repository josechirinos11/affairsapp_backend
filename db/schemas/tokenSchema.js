const typeToken = `
    type Token {
        token: String
        id_usuario_login: String
    }
`;

const inputAutenticarAcceso = `
     input AutenticarAccesoUsuario {
        correo: String!
        password: String!
    }
`;

//Aquí se agregan todas las queries de la entidad
const queriesToken = ``;

//Aquí se agregan todas las mutaciones de la entidad
const mutationsToken = `
       autenticarUsuario( input:  AutenticarAccesoUsuario ) : Token
`;

module.exports = {
    typeToken,
    inputAutenticarAcceso,
    queriesToken,
    mutationsToken
}