const {response} = require("express");
const Evento = require("../models/evento");

const obtenerEvents = async(req,res=response)=>{
    const uid = req.uid;
    const name = req.name;

    try {
      //verifico si el token es valido o no
      if (uid == null && !name == null) {
        return res.status(400).json({
          ok: false,
          msg: "token no valido o expirado",
        });
      }
      //crear el modelo y la funcion de traer todo segun un indice user
      //el populate trae campos extras del foraneo en este caso user
      let eventos = await Evento.find({user:uid}).populate('user','name');
      // 2. Enviar respuesta con los eventos
      res.status(200).json({
        ok: true,
        eventos,
      });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "error al traer los datos",
        });
    }
}

const newEvent = async(req,res=response)=>{
    const uid = req.uid;
    const name = req.name;

    try {
      //verifico si el token es valido o no
      if (uid == null && !name == null) {
        return res.status(400).json({
          ok: false,
          msg: "token no valido o expirado",
        });
      }

      let { start, end } = req.body;

      // Convertir las fechas a objetos Date
      start = new Date(start);
      end = new Date(end);

      // Verificar que las fechas sean válidas
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({
          ok: false,
          msg: "Formato de fecha inválido",
        });
      }

      //aki instancio un nuevo modelo
      let eve = new Evento({
        ...req.body,
        start,
        end,
        user: uid,
      });

      //aki lo save a la db
      await eve.save();
      //rpta de rpta correcta
      res.status(201).json({
        ok: true,
        msg: "Evento agregado",
        title: eve,
      });
    }
    catch(error){
        res.status(500).json({
          ok: false,
          msg: "error al traer los datos",
        });
    }
}

const editEvent = async(req,res=response)=>{
    const uid = req.uid;
    const name = req.name;
    const eveid = req.params.id;

    try {
      //verifico si el token es valido o no
      if (uid == null && !name == null) {
        return res.status(400).json({
          ok: false,
          msg: "token no valido o expirado",
        });
      }

      let eve = await Evento.findById(eveid);

      if(!eve) {
        return res.status(404).json({
          ok: false,
          msg: "error al traer los datosS",
        });
      }

      //este es para que otros user editen datos de otro user
      if(eve.user.toString() !== uid){
        return res.status(401).json({
          ok: false,
          msg: "usuario no permitido",
        });
      }

      const evenew = {
        ...req.body,
        user:uid
      }
      
      //new en true es simpre en postman mostrar la data update y no la copy before
      const fina = await Evento.findByIdAndUpdate(eveid,evenew,{new:true});

      res.status(201).json({
        ok: true,
        msg:"actualizado",
        evento:fina
      });
    }
    catch(error){
        res.status(500).json({
          ok: false,
          msg: "error al traer los datos",
        });
    }
}

const deleteEvent = async(req,res=response)=>{
    const uid = req.uid;
    const name = req.name;
    const eveid = req.params.id;

    try {
        if (uid == null && !name == null) {
          return res.status(400).json({
            ok: false,
            msg: "token no valido o expirado",
          });
        }

        let eve = await Evento.findById(eveid);

        if(!eve){
            return res.status(404).json({
                ok:false,
                msg:"No se encontro el id"
            });
        }

        if(eve.user.toString() !== uid){
            return res.status(401).json({
              ok: false,
              msg: "usuario no permitido",
            });
        }

        const final = await Evento.findByIdAndDelete(eveid);

        res.status(200).json({
            ok:true,
            msg:"Eliminado correctamente",
            evento:final
        })


    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg:"Error al eliminar"
        })
    }
}

module.exports = {
  obtenerEvents,
  newEvent,
  editEvent,
  deleteEvent,
};
