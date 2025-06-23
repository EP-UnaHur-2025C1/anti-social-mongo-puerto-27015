const {mongoose} = require('../db/mongodb');
const {Schema} = require('mongoose');
const comment_visibility = parseInt(process.env.MAX_COMMENT_VISIBILITY_MONTH, 10) || 6;

const commentSchema = new mongoose.Schema(
    {
        contenido: {
            type: String,
            required: true
        },
        creado: {
            type: Date,
            required: true
        },
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Post',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required: true
        }
    },
    {
        collection: 'Comment'
    }
);

commentSchema.virtual('visible').get(
    function() {
        return Math.floor(
            (new Date() - new Date(this.creado))/
            (1000*60*60*24*30) < comment_visibility
        );
    }
)

commentSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
        delete ret.__v
        delete ret._id
    }
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;