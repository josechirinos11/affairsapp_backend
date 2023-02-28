const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')

const conectarDB = require('./config/db')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'variables.env' });




//conectando a la base de datos
conectarDB()

// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
      //  se usa para pasar usuario por todo el resolver por la variable ctx
        const token = req.headers['authorization'] || 0;
      if(token) {
          try {
                const usuario =jwt.verify(token, process.env.SECRETA)
             //console.log(usuario)
                return {
                    usuario
                }
            } catch (error) {
             //   console.log('Error Hay un ERROR')
              //  console.log(error)
                return 0
            
            }
        }
    }
}
)

//Arrancar servidor
server.listen().then( ({url}) => {
    console.log(`Servidor listo ${url}`)
})