
const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        
        await mongoose.connect(process.env.DB_CNN || '');
        console.log("conectado");
        

    } catch (error) {
        //console.log(error);
        throw new Error("Nuevo error de conexion");
        
    }
}

module.exports = {
    dbConection
}