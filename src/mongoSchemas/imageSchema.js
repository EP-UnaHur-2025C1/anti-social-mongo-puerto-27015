const {mongoose} = require('../db/mongodb');
const {Schema} = require('mongoose');

const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: true
        },
        post: {
            type: String,
            required:true
        }
    }
);

imageSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v
        delete ret._id
    }
})

module.exports = imageSchema;