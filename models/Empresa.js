const { Schema, model } = require("mongoose");

const EmpresasSchema = Schema({
  razon_social: {
    type: String,

    trim: true,
  },
  dni: {
    type: String,

    trim: true,
  },
  id_Usuario: {
    type: String,
    trim: true,
  },
  telefono: {
    type: String,

    trim: true,
  },
  correo: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    type: String,

    trim: true,
  },
  logo: {
    type: String,

    trim: true,
  },

  rol: {
    type: String,

    trim: true,
  },

  fecha_creacion: {
    type: Date,
    default: Date.now(),
    trim: true,
  },
  fecha_modificacion: {
    type: Date,
    default: Date.now(),
    trim: true,
  },
  fecha_suscripcion: {
    type: Date,
    default: Date.now(),
    trim: true,
  },

  contacto: {
    type: String,

    trim: true,
  },
  correoContacto: {
    type: String,

    trim: true,
  },
  dniContacto: {
    type: String,

    trim: true,
  },
  telefonoContacto: {
    type: String,

    trim: true,
  },
  activo: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,

    trim: true,
  },
  tipo_suscripcion: {
    type: String,

    trim: true,
  },
  productos: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  inicioFormal: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Empresa", EmpresasSchema);
