const {Comment, post} = require('../mongoSchemas');

const getComments = async (req, res) => {
    const comments = await Comment.find({});
    res.status(200).json(comments);
};

const getCommentById = async (req, res) => {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
};

const getVisibleComments = async (req, res) => {
    const comments = await Comment.find({});
    const visibleComments = comments.filter(c => c.visible);
    res.status(200).json(visibleComments);
};
const getVisibleCommentsByPost = async (req, res) => {
    const {id} = req.params;
    const comments = await Comment.find({post:id});
    const visibleComments = comments.filter(c => c.visible);
    res.status(200).json(visibleComments);
};

const getUserComments = async (req, res) => {
    const id = req.params.id;
    const comments = await Comment.find({user:id});
    res.status(200).json(comments);
};

const getCommentsOnPostByUser = async (req, res) => {
    const {id, id2} = req.params;
    const comments = await Comment.find({post:id, user:id2});
    res.status(200).json(comments);
};

const createComment = async (req, res) => {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment); 
};

const updateComment = async (req, res) => {
    const id = req.params.id;
    const commentUpdated = await Comment.findOneAndUpdate({id}, {$set:{contenido:req.body.contenido}}, {new:true})
    res.status(200).json(commentUpdated);
};

const deleteComment = async (req, res) => {
    const id = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(id);
    res.status(200).json(deletedComment)
};

module.exports = {
    getComments,
    getCommentById,
    getUserComments,
    getCommentsOnPostByUser,
    getVisibleComments,
    getVisibleCommentsByPost,
    createComment,
    updateComment,
    deleteComment
};

