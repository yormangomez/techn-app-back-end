const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');



const helpers = {}

helpers.esRoleValido = async (rol = '')  => {

    const existRol = await Role.findOne({ rol });
    if ( !existRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la base de datos`)
    }
    return true;

}

helpers.emailExists = async (email = '') => {
    const existEmail = await User.findOne({email});
    if (existEmail) {
        throw new Error(`El correo: ${email} ya esta registrado`)
    }
    return true;

}

helpers.emailExistsId = async (id) => {
    const emailExists = await User.findById(id);
    if (!emailExists) {
        throw new Error(`El id no existe ${id}`)
    }
    return true;

}

helpers.categoryExistsId = async (id) => {
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
        throw new Error(`El id no existe ${id}`)
    }
    return true;

}

helpers.productExistsId = async (id) => {
    const productExists = await Product.findById(id);
    if (!productExists) {
        throw new Error(`El id no existe ${id}`)
    }
    return true;

}

helpers.allowedCollections = async (collection = '', collections = []) => {

    const incluide = collections.includes(collection);
    if(!incluide) {
        throw new Error(`La colección ${collection} no es permitida, ${collections}`)
    }
    return true;
}

module.exports = helpers