const { response, request } = require('express')
const path = require('path')
const fs = require('fs');

const helpersArchive = require('../helpers/subir_archivo')

const User = require('../models/user')
const Product = require('../models/product')


const uploadsCtrl = {}

uploadsCtrl.fileUpload = async (req = request, res = response) => {

    try {

        //Image
        const pathCompleto = await helpersArchive.subirArchivo(req.files, ['txt', 'md'], 'text')

        res.json({
            path: pathCompleto
        })

    } catch (error) {
        res.status(400).json({msg})
    }

}

uploadsCtrl.updateImage = async (req = request, res = response) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'user':
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;
        case 'product':
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'})
    }

    // Limpiar imágenes previas

    if (model.img) {
        //Hay que borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', collection, model.img)
        if( fs.existsSync(pathImage) ) {
            fs.unlinkSync(pathImage)
        }
    }

    const name = await helpersArchive.subirArchivo(req.files, undefined, collection)
    model.img = name;

    await model.save();

    res.json(model)
}

uploadsCtrl.showPicture = async (req = request, res = response) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'user':
            model = await User.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }

            break;
        case 'product':
            model = await Product.findById(id);
            if(!model) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

            break;

        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto'})
    }

    // Limpiar imágenes previas

    if (model.img) {
        //Hay que borrar la imagen del servidor
        const pathImage = path.join(__dirname, '../uploads', collection, model.img)
        if( fs.existsSync(pathImage) ) {
          return res.sendFile(pathImage)
        }
    }

    const pathImageAssets = path.join(__dirname, '../assets/no-image.jpg')
    res.sendFile(pathImageAssets)

}

module.exports = uploadsCtrl