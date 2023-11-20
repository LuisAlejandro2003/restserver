const { Router } = require('express');
const { check } = require('express-validator');

//!Importar controller data
const { dataPost, dataGet, probabilidadTemperature, dataGrafic, dataEmit , mediaUltimos30Dias} = require('../controllers/data.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require( '../middlewares/validar-jwt');


const router = Router();


router.get('/',[validarJWT], dataGet);


router.get('/temperature',[validarJWT], probabilidadTemperature);
router.get('/grafic',[validarJWT], dataGrafic);
router.get('/media', [validarJWT], mediaUltimos30Dias);


router.post('/emit', dataEmit);

router.post('/', [
    check('temperatura', 'La temperatura es obligatoria').not().isEmpty(),
    check('humedad', 'La humedad es obligatoria').not().isEmpty(),
    check('luxes', 'La cantidad de luxes es obligatoria').not().isEmpty(),
    check('hora', 'La hora es obligatoria').not().isEmpty(),
    validarCampos
], dataPost);





module.exports = router;   