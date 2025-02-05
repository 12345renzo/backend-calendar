const path = require('path');
const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//crear el servidor express
const app = express();

//base de datos
dbConection();

//usar el cors
app.use(cors());

//directorio publico
//use es un middleware funcion que se ejecuta cuando ay una peticion al servidor
app.use(express.static('public'));

//lectura y parceo del body
app.use(express.json());

//rutas
//par el auth
app.use('/api/auth',require('./routes/auth'));
//para el evento del crud
app.use("/api/events",require("./routes/events"));


app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});


//escucha peticiones y puertos
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});