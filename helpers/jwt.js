
const jwt = require('jsonwebtoken');

const generarJWT = (uid,name) => {

    return new Promise((resolve,reject)=>{
        const payload = {uid,name};
        //firmamos el payload
        //le mandamos el payload, la palabra secreta y la duracion aki fue 1h
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn:'1h'
        },(err,token)=>{
            //aki veo si se genero vien o no
            if(err){
                console.log(err);
                reject('No se puedo generar el token')
            }
            //si es vien lo retorno
            resolve(token)
        });
    });

}

module.exports = {
    generarJWT
}