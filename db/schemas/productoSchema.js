const typeProducto = `
type Producto {
    id: ID
    codigo: String
}
`;

const inputProducto = `
input ProductoInput {
    nombre: String!
    codigo: String!
    empresa: String!
    usuario: String
    precio_costo: Float
    precio_venta: Float
    stock_maximo: Int
    stock_minimo: Int
}

input ActualizarProductoInput {
    id: String!
    empresa: String
    usuario: String
    nombre: String
    precio_costo: Float
    precio_venta: Float
    stock_maximo: Int
    stock_minimo: Int
    activo: Boolean
}
`;
//Aquí se agregan todas las queries de la entidad
const queriesProducto = `
`;

//Aquí se agregan todas las mutaciones de la entidad
const mutationsProducto = `
    nuevoProducto(input: ProductoInput): Producto,
    actualizarProducto(input: ActualizarProductoInput): Producto
`;


module.exports = { 
    typeProducto,
    inputProducto,
    queriesProducto,
    mutationsProducto
}