const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const conectarDB = async () => {
    try {
        let str_conn = process.env.DB_MONGO
        if(process.env.ENV_DEV === "jemel"){
            str_conn = process.env.LOCAL_MONGO
        }
        mongoose.set("strictQuery", false);
        await mongoose.connect(str_conn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           //useFindAndModify: false,
           // useCreateIndex: true
        })

    } catch (error) {
        console.log('Error Verificarlo')
        console.log(error)
        process.exit(1)//detenemos la aplicacion
    }
}

module.exports = conectarDB