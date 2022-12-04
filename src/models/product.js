const {Schema, model} = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    description: { type: String },
    available: { type: String, default: true },
    img: {type: String}
},{
    timestamps: true,
    versionKey: false
});

ProductSchema.methods.toJSON = function() {
    const {estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Product', ProductSchema);