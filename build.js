// Importa los módulos o configuraciones necesarias
const fs = require("fs");

// Ejecuta las tareas de construcción
console.log("Iniciando la construcción...");

// Realiza las tareas necesarias para construir tu aplicación
// Por ejemplo, puedes copiar archivos estáticos, minificar archivos, etc.

// Copia archivos estáticos
fs.copyFileSync("src/static/file.txt", "dist/static/file.txt");

console.log("Construcción finalizada.");
