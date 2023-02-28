const typeUsuario = `
type Usuario {
    id: ID
    correo: String
    rol: String
    empresa: [Empresa]
    
}
`;

const inputUsuario = `
input UsuarioInput {
    correo: String!
    password: String!
}

input buscandoID {
    correo: String!
    
}


input ActualizarUsuarioInput {
    id: String!
    empresa: String
    nombre: String
    apellido: String
    dni: String
    direccion: String
    telefono: String
    rol: String
    password: String
    password_Repeat: String
    condicion: String
}
`;
//Aquí se agregan todas las queries de la entidad
const queriesUsuario = `
    obtenerUsuario(token: String!):  Usuario

`;

//Aquí se agregan todas las mutaciones de la entidad
const mutationsUsuario = `
    nuevoUsuario(input: UsuarioInput): Usuario,
    actualizarUsuario(input: ActualizarUsuarioInput): Usuario,
    buscarUsuarioId(input: buscandoID): Usuario
    buscarUsuariCorreo(input: buscandoID): Usuario
    
`;


module.exports = { 
    typeUsuario,
    inputUsuario,
    queriesUsuario,
    mutationsUsuario
}