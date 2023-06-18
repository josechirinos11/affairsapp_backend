require("dotenv").config({ path: "variables.env" });
const jwt = require('jsonwebtoken');

const ValidarToken = async (input) => {
    const token = input.token;
    try {
      // Verificar el token utilizando la clave secreta
      const decoded = jwt.verify(token, process.env.SECRETA);
      const { id, correo } = decoded;
      // Si el token es válido, la verificación no lanzará ninguna excepción
      return {
        status: true,
        id,
        correo,
      };
    } catch (error) {
      // Si ocurre un error al verificar el token, se considera inválido
      return {
        status: false,
        id: null,
        correo: null,
      };
    }
  };
  

module.exports = {
  ValidarToken
}