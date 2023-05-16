const typeToken = `
    type Token {
        token: String
        id_usuario_login: String
    }
`;
const inputHoraToken = `
    input Hora {
        HH: String! 
    }
`;
const inputAutenticarAcceso = `
     input AutenticarAccesoUsuario {
        correo: String!
        password: String!
    }
`;
const inputValidarToken = `
     input ValidarToken {
        token: String!
        
    }
`;

//Aquí se agregan todas las queries de la entidad
const queriesToken = ``;

//Aquí se agregan todas las mutaciones de la entidad
const mutationsToken = `
       autenticarUsuario( input:  AutenticarAccesoUsuario ) : Token
       validarToken(input: ValidarToken) : Token
       renovarToken(input:  Hora) : Token
`;

module.exports = {
  typeToken,
  inputAutenticarAcceso,
  inputValidarToken,
  inputHoraToken,
  queriesToken,
  mutationsToken,
};
