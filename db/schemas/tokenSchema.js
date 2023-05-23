const typeToken = `
    type Token {
        token: String
        id_usuario_login: String
    }
`;
const typeCodigo = `
    type Codigo {
        codigoRecuperacion: String
       
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
const inputRecuperarPassword = `
     input RecuperarPassword {
        correo: String!
        
    }
`;

//Aquí se agregan todas las queries de la entidad
const queriesToken = ``;

//Aquí se agregan todas las mutaciones de la entidad
const mutationsToken = `
       autenticarUsuario( input:  AutenticarAccesoUsuario ) : Token
       validarToken(input: ValidarToken) : Boolean
       renovarToken : Token
       recuperarPassword( input: RecuperarPassword) : Codigo
`;

module.exports = {
  typeToken,
  typeCodigo,
  inputAutenticarAcceso,
  inputValidarToken,
  inputHoraToken,
  inputRecuperarPassword,
  queriesToken,
  mutationsToken,
};
