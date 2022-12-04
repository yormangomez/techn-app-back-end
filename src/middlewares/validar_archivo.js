const { response, request } = require('express')

const middlewareArchive = {}

middlewareArchive.validarArchivoSubir = async (req = request, res = response, next) => {
    if(!req.files || Object.keys(req.files).length == 0 || !req.files.archive){
        return  res.status(400).json({
            msg: 'No hay archivos que  - validar archivo'
        });
    }
    next();
}

module.exports = middlewareArchive