const {mongoose} = require('../db/mongodb');
const {Schema} = require('mongoose');
const post_image = require('../mongoSchemas/imageSchema')

const postSchema = new mongoose.Schema(
    {
        descripcion: {
            type: String,
            required: true
        },
        creado: {
            type: Date,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        },
        images: [post_image],
        tags: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Tag'
        }]
    },
    {
        collection: 'Post'
    }
);

postSchema.set('toJSON', {
    transform: (_, ret) => {
        delete ret.__v
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;