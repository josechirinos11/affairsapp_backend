const typeEmpresa = `
    type Empresa {
        id: ID
        correo: String
        _idUsuario : String

  
    }
`;
const typeEmpresaActualizada = `
    type EmpresaActualizada {
        id: ID
        correo: String

        nombre: String
        dni: String
        direccion: String
        rol: String
        fecha_creacion: String
        fecha_modificacion: String
        fecha_suscripcion: String
        telefono: String
        contacto: String
        correoContacto: String
        dniContacto: String
        telefonoContacto: String
        activo: String
        status: String
        tipo_suscripcion: String
    }
`;
const inputActualizacionEmpresa = `
input ActualizacionEmpresaInput {
    id: String!
    correo: String
    nombre: String
    dni: String
    direccion: String
    rol: String
    fecha_creacion: String
    fecha_modificacion: String
    fecha_suscripcion: String
    telefono: String
    contacto: String
    correoContacto: String
    dniContacto: String
    telefonoContacto: String
    activo: String
    status: String
    tipo_suscripcion: String
 


}
`;
const inputEmpresa = `
    input EmpresaInput {
        correo: String!
        password: String!
    }
`;

//Aquí se agregan todas las queries de la entidad
const queriesEmpresa = `
buscarEmpresasUsuario(id: String) : [Empresa]
buscarEmpresaID(id: String) : Empresa
`;
    
//Aquí se agregan todas las mutaciones de la entidad
const mutationsEmpresa = `
    nuevaEmpresa(input: EmpresaInput) : Empresa
    actualizacionEmpresa(input: ActualizacionEmpresaInput) : Empresa
    
`;

module.exports = { 
    typeEmpresa,
    typeEmpresaActualizada, 
    inputEmpresa, 
    inputActualizacionEmpresa,
    queriesEmpresa, 
    mutationsEmpresa 
}