const { default: mongoose } = require("mongoose");
const { Schema, model } = require("mongoose");

const UsuariosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  dni: {
    type: String,
    trim: true,
  },
  correo: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  direccion: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  password_Repeat: {
    type: String,
    required: true,
    trim: true,
  },
  rol: {
    type: String,
    trim: true,
    default: "user",
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

  telefono: {
    type: String,

    trim: true,
  },
  condicion: {
    type: String,

    trim: true,
  },
  empresas: {
    type: Schema.Types.ObjectId,
    ref: "Empresa",
  },
  id_Usuario: {
    type: String,
    trim: true,
  },
  codigoPassword: {
    type: String,
    trim: true,
  },
});

module.exports = model("Usuario", UsuariosSchema);
