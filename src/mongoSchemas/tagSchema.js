const {mongoose} = require('../db/mongodb');
const {Schema} = require('mongoose');

const tagSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        posts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Post',
            required: true
        }]
    },
    {
        collection: 'Tag'
    }
);

tagSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret.__v
        delete ret._id
    }
})

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;