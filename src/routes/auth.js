const { Router } = require('express')
const { check } = require('express-validator')

const middleware  = require('../middlewares/validar_campos')
const authCtrl = require('../controllers/auth')

const router = Router();



router.post('/signIn',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    middleware.validarCampos
],  authCtrl.signIn);

router.post('/google',[
    check('id_token', 'id_toke es necesario').not().isEmpty(),
    middleware.validarCampos
],  authCtrl.googleSignIn);

module.exports = router