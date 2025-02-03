
const {response} = require("express");
const jwt = require('jsonwebtoken');


const validarToken = (req,res=response,next) => {
    //recibo el token del header
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No ay token en la peticion'
        });
    }

    try {
        //verificamos el payload
        const {uid,name} = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:'Token no valido'
        })
    }

 

    next();
}

module.exports = {
    validarToken
}