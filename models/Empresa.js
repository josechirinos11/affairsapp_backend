const { Schema, model } = require('mongoose')

const EmpresasSchema = Schema({
    nombre: {
        type: String,
       
        trim: true
    },
    dni: {
        type: String,
       
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
       
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
       
        trim: true
    },
 
    fecha_creacion: {
        type: Date,
        default: Date.now(),
        trim: true
    },
    fecha_modificacion: {
        type: Date,
        default: Date.now(),
        trim: true
    },
    fecha_suscripcion: {
        type: Date,
        default: Date.now(),
        trim: true
    },
    telefono: {
        type: String,
        
        trim: true
    },
    contacto: {
        type: String,
       
        trim: true
    },
    correoContacto: {
        type: String,
        
        trim: true
    },
    dniContacto: {
        type: String,
      
        trim: true
    },
    telefonoContacto: {
        type: String,
        
        trim: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        
        trim: true
    },
    tipo_suscripcion: {
        type: String,
        
        trim: true
    },
    productos: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    },
    inicioFormal: {
        type: Boolean,
        default: false
    },
    _idUsuario: {
        type: String,
        trim: true
    }

})

module.exports = model('Empresa', EmpresasSchema)