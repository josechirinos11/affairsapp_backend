const typeEmpresa = `
    type Empresa {
        id: ID
        razon_social: String
        dni: String
        id_Usuario: String
        telefono: String
        correo: String
        direccion: String
        logo: String
        inicioFormal: Boolean

        rol: String
        fecha_creacion: String
        fecha_modificacion: String
        fecha_suscripcion: String
        
        contacto: String
        correoContacto: String
        dniContacto: String
        telefonoContacto: String
        activo: String
        status: String
        tipo_suscripcion: String
    }
`;
const typeEmpresaActualizada = `
    type EmpresaActualizada {
        id: ID
        razon_social: String
        dni: String
        id_Usuario: String
        telefono: String
        correo: String
        direccion: String
        logo: String
        inicioFormal: Boolean

        rol: String
        fecha_creacion: String
        fecha_modificacion: String
        fecha_suscripcion: String
        
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
        id: ID
        razon_social: String
        dni: String
        id_Usuario: String
        telefono: String
        correo: String
        direccion: String
        logo: String
        inicioFormal: Boolean

        rol: String
        fecha_creacion: String
        fecha_modificacion: String
        fecha_suscripcion: String
        
        contacto: String
        correoContacto: String
        dniContacto: String
        telefonoContacto: String
        activo: String
        status: String
        tipo_suscripcion: String
    }
`;

//Aquí se agregan todas las queries de la entidad
const queriesEmpresa = `
buscarEmpresasUsuario(id: String, token: String) : [Empresa]
buscarEmpresaID(id: String, token: String) : Empresa
obtenerListadoEmpresas(token: String): [Empresa]
`;

//Aquí se agregan todas las mutaciones de la entidad
const mutationsEmpresa = `
    nuevaEmpresa(input: EmpresaInput, token: String!) : Empresa
    actualizacionEmpresa(input: ActualizacionEmpresaInput, token: String) : Empresa
    
`;

module.exports = {
  typeEmpresa,
  typeEmpresaActualizada,
  inputEmpresa,
  inputActualizacionEmpresa,
  queriesEmpresa,
  mutationsEmpresa,
};
