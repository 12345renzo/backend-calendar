const { response } = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const newUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usua = await Usuario.findOne({ email });

    if (usua) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe el usuario con ese correo",
      });
    }

    usua = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    usua.password = bcrypt.hashSync(password, salt);

    await usua.save();

    //generamos token
    //generar token
    const token = await generarJWT(usua.id, usua.name);

    //regresar si todo esta bien
    res.status(201).json({
      ok: true,
      uid: usua.id,
      name: usua.name,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "registro invalido",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usua = await Usuario.findOne({ email });

    if (!usua) {
      return res.status(400).json({
        ok: false,
        msg: "No existe ese usuario",
      });
    }

    //confirmar las password
    const valida = bcrypt.compareSync(password, usua.password);
    if (!valida) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña esta mal",
      });
    }

    //generar token
    const token = await generarJWT(usua.id,usua.name);
    
    //retornar rpta
    res.status(202).json({
        ok: true,
        msg: "Logeado correctamente",
        uid:usua.id,
        name:usua.name,
        token
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "able con el admin",
    });
  }

  //regresar si todo esta bien
  res.json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const revalidarToken = async(req, res = response) => {

  const uid = req.uid;
  const name = req.name;

  const token = await generarJWT(uid,name);

  res.json({
    ok: true,
    token
  });
};

module.exports = { newUser, loginUser, revalidarToken };
