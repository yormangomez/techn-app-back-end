const {Schema, model} = require('mongoose')

const userSchema = Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE','TECHNICAL_ROLE','SUPPORTS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

},{
    timestamps: true,
    versionKey: false
});

userSchema.methods.toJSON = function() {
    const {password, _id,...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', userSchema);