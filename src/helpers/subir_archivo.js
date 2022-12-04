const path = require('path')
const {v4: uuidv4} = require('uuid')

const helpersArchive = {}

helpersArchive.subirArchivo = async (files, extensiones = ['png','jpg','jpeg','gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const { archive } = files
        const nombreCortado = archive.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1 ];

        //validar la extension
        if (!extensiones.includes(extension)) {
            return reject(`La extension ${extension} no es permitida - ${extensiones}`)

        }


        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder,nombreTemp);

        archive.mv(uploadPath, (err) => {
            if(err){
                reject(err);
            }


            resolve( nombreTemp )

        })
    })


}

module.exports = helpersArchive