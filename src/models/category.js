const {Schema, model} = require('mongoose')

const CategorySchema = Schema({
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
        ref:'User',
        required: true
    }
},{
    timestamps: true,
    versionKey: false
});

CategorySchema.methods.toJSON = function() {
    const {estado, ...data } = this.toObject();
    return data;
}

module.exports = model('Category', CategorySchema);