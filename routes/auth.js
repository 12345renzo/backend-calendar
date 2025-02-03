const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { newUser, revalidarToken, loginUser } = require("../controllers/auth");
const { validar } = require("../middlewares/validar");
const { validarToken } = require("../middlewares/validarToken");

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio y de 6 caracteres").isLength({
      min: 6,
    }),
    validar
  ],
  newUser
);

router.post(
  "/",
  [
    check("email", "El email es invalido").isEmail(),
    check("password", "El password es incorrecto")
      .isLength({ min: 6 }),
    validar
  ],
  loginUser
);

router.get("/renew",validarToken, revalidarToken);

module.exports = router;
