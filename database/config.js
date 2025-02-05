
const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        
        await mongoose.connect(process.env.DB_CNN || '');
        console.log("conectado");

        /*if (!process.env.DB_CNN) {
          throw new Error(
            "DB_CNN no está definida en las variables de entorno"
          );
        }

        await mongoose.connect(process.env.DB_CNN);

        console.log("Conexión exitosa a MongoDB");*/
        

    } catch (error) {
        //console.log(error);
        console.error("Error detallado:", error);
        throw new Error("Nuevo error de conexion");
        
    }
}

module.exports = {
    dbConection
}