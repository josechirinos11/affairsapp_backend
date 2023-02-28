const Producto = require("../models/Producto");

const nuevoProducto = async (_, { input }, ctx) => {
  //verificacion de autenticacion
  if (Object.keys(ctx).length === 0) {
    throw new Error("Antes debe iniciar sesión");
  }
  const id_empresa = input.id;
  const usr_admin = await Usuario.findById(ctx.usuario.id);
  if (!usr_admin) {
    throw new Error("identidad de usuario no existe");
  }

  const { codigo } = input;

  //Se busca el producto por código
  const existeCodigo = await Producto.findOne({ codigo });
  if (existeCodigo) {
    throw new Error("Este código ya se encuentra registrado");
  }

  try {
    const prod = new Producto(input);
    prod.save();
    return prod;
  } catch (error) {
    console.log(error);
  }
};

const actualizarProducto = async (_, { input }) => {
  const id_producto = input.id;

  try {
    const existeProducto = await Producto.findById(id_producto);
    if (!existeProducto) {
      console.log("Usuario no existe en la Base de datos");
      return false;
    }

    if (!input.empresa || input.empresa == "") {
      input.empresa = existeProducto.empresa;
    }

    /*
        if(!input.usuario || input.usuario == ''){
            input.usuario = existeProducto.usuario
        }
        */

    const cambiosProducto = {
      ...input,
    };

    const actualizacionProducto = await Producto.findByIdAndUpdate(
      id_producto,
      cambiosProducto,
      { new: true }
    );
    return actualizacionProducto;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  nuevoProducto,
  actualizarProducto,
};
