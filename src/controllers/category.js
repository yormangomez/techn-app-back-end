const { response, request } = require('express')
const Category = require('../models/category')

const categotyCtrl = {}

categotyCtrl.getAllCategory = async (req = request, res = response) => {
    const { limit = 5, from = 0} = req.query;
    const query = {estado: true}

    const [allCategory, category] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query).populate('user', 'firstName').skip(Number(from)).limit(Number(limit))
    ])

    res.json({
        allCategory,
        category
    })


}

categotyCtrl.getCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const category = await Category.findById( id ).populate('user', 'firstName')

    res.json(category);

}

categotyCtrl.createrCategory = async (req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({name})

    if( categoryDB ) {
        return res.status(400).json({
            msg: `La category ${categoryDB.name}, ya existe`
        })
    }

    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data)

    await category.save();

    res.status(201).json(category)

}

categotyCtrl.updateCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const category = await Category.findByIdAndUpdate(id, data, { new: true })

    res.json(category);

}


categotyCtrl.deletedCategory = async (req = request, res = response) => {

    const { id } = req.params;

    const category = await Category.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json(category);

}

module.exports = categotyCtrl