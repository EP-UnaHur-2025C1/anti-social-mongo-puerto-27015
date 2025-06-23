const {mongoose} = require('../db/mongodb');
const {Schema} = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        nickName: {
            type: String,
            required: true
        },
        fechaNacimiento: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    {
        collection: 'User'
    }
);

userSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;