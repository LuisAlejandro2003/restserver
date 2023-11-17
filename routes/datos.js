const { Router } = require('express');
const { check } = require('express-validator');

//!Importar controller data
const { dataPost, dataGet, probabilidadTemperature, dataGrafic, dataEmit } = require('../controllers/data.controller');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.get('/', dataGet);


router.get('/temperature', probabilidadTemperature);
router.get('/grafic', dataGrafic);
router.post('/emit', dataEmit);



router.post('/', [
    check('temperatura', 'La temperatura es obligatoria').not().isEmpty(),
    check('humedad', 'La humedad es obligatoria').not().isEmpty(),
    check('luxes', 'La cantidad de luxes es obligatoria').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    validarCampos
], dataPost);





module.exports = router;   