const { Router } = require('express')

const middlewareJWT  = require('../middlewares/validar_jwt')
const searchCtrl = require('../controllers/search')


const router = Router();

router.get('/:collection/:term',[middlewareJWT.validarJWT], searchCtrl.search)

module.exports = router