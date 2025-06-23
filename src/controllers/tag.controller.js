const {Tag, post} = require('../mongoSchemas');

const getTags = async (req, res) => {
    const tags = await Tag.find({});
    res.status(200).json(tags);
};

const getTagById = async (req, res) => {
    const id = req.params.id;
    const tag = await Tag.findById(id);
    res.status(200).json(tag);
};

const getPostsByTag = async (req, res) => {
    const id = req.params.id;
    const posts = await Tag.find(id).populate('posts');
    res.status(200).json(posts);
};

const getImagesByTag = async (req, res) => {
    const id = req.params.id;
    const images = await Tag.find(id).populate('posts').select('images -_id');
    res.status(200).json(images);
};

const getUsersByTag = async (req, res) => {
    const id = req.params.id;
    const posts = await Tag.find(id).populate({path:'post', populate: {path:'user'}});
    res.status(200).json(posts);
};

const createTag = async (req, res) => {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag); 
};

const createAndOrAssociateTags = async (req, res) => {
    const id = req.params.id;
    const {tags} = req.body;
    const existingPost = await post.findById(id);
    for(let tag of tags) {
        let existingTag = await Tag.findOne({nombre:tag});
        let newTag = existingTag ? existingTag : await Tag.create({nombre:tag, post:id})
    newTag.posts.push(existingPost._id);
    existingPost.tags.push(newTag._id)
    }
    await existingPost.save();
    res.status(201).json();
};

const updateTag = async (req, res) => {
    const id = req.params.id;
    const tagUpdated = await Tag.findOneAndUpdate({id}, {$set:{nombre:req.body.nombre}}, {new:true})
    res.status(200).json(tagUpdated);
};

const deleteTag = async (req, res) => {
    const id = req.params.id;
    const tagDeleted = await Tag.findByIdAndDelete(id);
    res.status(200).json(tagDeleted);
};

module.exports = {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
    createAndOrAssociateTags,
    getPostsByTag,
    getImagesByTag,
    getUsersByTag
};