const { Router } = require('express')
const { check } = require('express-validator')

const middleware  = require('../middlewares/validar_campos')
const middlewareArchive = require('../middlewares/validar_archivo')
const helpers = require('../helpers/db_validators')

const uploadsCtrl = require('../controllers/uploads');

const router = Router();

router.get('/:collection/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    check('collection').custom(c => helpers.allowedCollections(c, ['user', 'product'])),
    middleware.validarCampos
], uploadsCtrl.showPicture)

router.post('/',[middlewareArchive.validarArchivoSubir],  uploadsCtrl.fileUpload);

router.put('/:collection/:id',[
    middlewareArchive.validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    check('collection').custom(c => helpers.allowedCollections(c, ['user', 'product'])),
    middleware.validarCampos
],  uploadsCtrl.updateImage);



module.exports = router