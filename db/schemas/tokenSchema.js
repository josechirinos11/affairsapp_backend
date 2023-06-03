const typeToken = `
    type Token {
        token: String
        id_usuario_login: String
    }
`;
const typeCodigo = `
    type Codigo {
        codigoRecuperacion: String
        idUsuario: String
        fechaExpiracion: String
       
    }
`;
const typeInfoToken = `
    type InfoToken {
        correo: String
        id: String
        status: Boolean
       
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
       validarToken(input: ValidarToken) : InfoToken
       renovarToken : Token
       recuperarPassword( input: RecuperarPassword) : Codigo
       validarCorreo( input: RecuperarPassword) : Codigo
`;

module.exports = {
  typeToken,
  typeCodigo,
  typeInfoToken,
  inputAutenticarAcceso,
  inputValidarToken,
  inputHoraToken,
  inputRecuperarPassword,
  queriesToken,
  mutationsToken,
};
