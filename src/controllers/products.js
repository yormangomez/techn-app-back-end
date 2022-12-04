const { response, request } = require('express')
const Product = require('../models/product')

const productsCtrl = {}

productsCtrl.getAllproducts = async (req = request, res = response) => {
    const { limit = 5, from = 0} = req.query;
    const query = {estado: true}

    const [allProduct, product] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'firstName')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        allProduct,
        product
    })


}

productsCtrl.getproduct = async (req = request, res = response) => {

    const { id } = req.params;
    const product = await Product.findById( id ).populate('user', 'firstName').populate('category', 'name')


    res.json(product);

}

productsCtrl.createrproduct = async (req = request, res = response) => {
    const { estado, user, ...body } = req.body;

    const ProductDB = await Product.findOne({name: body.name})

    if( ProductDB ) {
        return res.status(400).json({
            msg: `La producto ${ProductDB.name}, ya existe`
        })
    }

    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id,
    }

    const product = new Product(data)

    await product.save();

    res.status(201).json(product)

}

productsCtrl.updateproduct = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, user, ...data } = req.body;

    if ( data.name ) {
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;

    const product = await Product.findByIdAndUpdate(id, data, { new: true })

    res.json(product);

}


productsCtrl.deletedproduct = async (req = request, res = response) => {

    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(product);

}

module.exports = productsCtrl