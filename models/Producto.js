const { Schema, model } = require('mongoose')

const ProductosSchema = Schema({
    nombre: {
        type: String,
        trim: true
    },
    codigo: {
        type: String,
        unique: true
    },
    precio_costo: {
        type: Number
    },
    precio_venta: {
        type: Number
    },
    stock_maximo: {
        type: Number       
    },
    stock_minimo: {
        type: Number       
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
    activo: {
        type: Boolean,
        default: true
    }

})

module.exports = model('Producto', ProductosSchema)