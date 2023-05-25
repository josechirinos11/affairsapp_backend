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
`;
const inputBuscandoID = ` 
input buscandoIDInput {
    correo: String!
    
}
`;
const ActualizarUsuario = ` 
input ActualizarUsuarioInput {
    id: String
    nombre: String
    apellido: String
    dni: String
    correo: String
    direccion: String
    password: String
    password_Repeat: String
    rol: String   
    telefono: String
    condicion: String
    empresa: String
    id_Usuario: String
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
    buscarUsuarioId(input: buscandoIDInput): Usuario
    buscarUsuariCorreo(input: buscandoIDInput): Usuario
    
`;

module.exports = {
  typeUsuario,
  inputUsuario,
  inputBuscandoID,
  ActualizarUsuario,
  queriesUsuario,
  mutationsUsuario,
};
