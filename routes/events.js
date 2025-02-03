const {Router} = require("express");
const router = Router();
const {check} = require("express-validator");
const { validarToken } = require("../middlewares/validarToken");
const { obtenerEvents, newEvent, editEvent, deleteEvent } = require("../controllers/event");
const { validar } = require("../middlewares/validar");


router.use(validarToken)

//tienen que estar validadas por el jwt
//obtener
router.get(
    "/",
    obtenerEvents
);

//crear
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("notes", "La nota es obligatorio").not().isEmpty(),
    check("start", "La fecha inicial es obligatorio").isDate(),
    check("end", "La fecha final es obligatorio").isDate(),
    validar,
  ],
  newEvent
);

//actualizar
router.put(
    "/:id",
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("notes", "La nota es obligatorio").not().isEmpty(),
        check("start", "La fecha inicial es obligatorio").isDate(),
        check("end", "La fecha final es obligatorio").isDate(),
        validar,
    ],
    editEvent
);

//borrar
router.delete("/:id", deleteEvent);

module.exports = router;
