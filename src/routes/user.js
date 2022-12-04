const { Router } = require('express')
const { check } = require('express-validator')

const router = Router();

const userCtrl = require('../controllers/user.js')
const middleware  = require('../middlewares/validar_campos')
const middlewareJWT  = require('../middlewares/validar_jwt')
const middlewareRoles  = require('../middlewares/validar_roles')

const helpers = require('../helpers/db_validators')



router.get('/', userCtrl.getUsers)
router.post('/', [
    check('firstName', 'El nombre es obligatorio').not().isEmail(),
    check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check('email', 'El correo no es valido').custom(helpers.emailExists),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE','TECHNICAL_ROLE','SUPPORTS_ROLE']),
    check('rol').custom( helpers.esRoleValido ),
    middleware.validarCampos
], userCtrl.postUser);

router.get('/:id', userCtrl.getUser)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpers.emailExistsId),
    check('rol').custom( helpers.esRoleValido ),
    middleware.validarCampos
], userCtrl.putUser)

router.delete('/:id', [
    middlewareJWT.validarJWT,
    middlewareRoles.hasRole('ADMIN_ROLE','USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpers.emailExistsId),
    middleware.validarCampos

], userCtrl.deleteUser)


module.exports = router