const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { emailExiste, existeUsuarioPorId } = require('../helpers/db-validator');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe de ser mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], usuariosPost);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);



module.exports = router;   