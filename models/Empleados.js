const { default: mongoose } = require('mongoose')
const { Schema, model } = require('mongoose')


const EmpleadosSchema = Schema({
    nombre: {
        type: String,
        trim: true
    },
    apellido: {
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
        trim: true,
        unique: true
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
        trim: true,
        default: "empleado"
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
 
    telefono: {
        type: String,
        
        trim: true
    },
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario"
    }


})

module.exports = model('Empleado', EmpleadosSchema)