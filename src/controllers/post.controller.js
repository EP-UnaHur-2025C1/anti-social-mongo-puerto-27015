const {post, Comment} = require('../mongoSchemas');

const getPosts = async (req, res) => {
    const posts = await post.find({}).populate('user').populate('tags');
    res.status(200).json(posts);
};

const getPostById = async (req, res) => {
    const id = req.params.id;
    const postById = await post.findById(id).populate('user').populate('tags');
    res.status(200).json(postById);
};

const getPostsByUser = async (req, res) => {
    const id = req.params.id;
    const postsByUser = await post.find({user:id}).populate('user').populate('tags');
    res.status(200).json(postsByUser);
};

const getPostsFull = async (req, res) => {
    const posts = await post.find({}).populate('user -__v').populate('tags -__v').lean();
    const comments = await Comment.find({}).select('-__v').lean();
    const filterPostComments = (id) => comments.filter(c => c.post == id);
    const postsWithComments = posts.map(p => {
        let postComments = filterPostComments(p._id);
        return {...p, postComments}
    });
    res.status(200).json(postsWithComments);
};

const createPost = async (req, res) => {
    const newPost = await post.create(req.body);
    res.status(201).json(newPost);
};

const updatePost = async (req, res) => {
    const id = req.params.id;
    const postUpdated = await post.findOneAndUpdate({id}, {$set:{descripcion:req.body.descripcion}}, {new:true})
    res.status(201).json(postUpdated);
};

const deletePost = async (req, res) => {
    const id = req.params.id;
    //ver si borrar tags solo si estan asociados unicamente con la imagen a borrar
    const commentsDeleted = await Comment.deleteMany({post:id})
    const postDeleted = await post.findByIdAndDelete(id);
    res.status(200).json(postDeleted);
};

const getImages = async (req, res) => {
    const images = await post.find({}).select('images');
    res.status(200).json(images);
};

const getImageById = async (req, res) => {
    const id = req.params.id;
    const image = await post.findById(id).select('images');
    res.status(200).json(image);
};

const getImagesByUser = async (req, res) => {
    const id = req.params.id;
    const imagesByUser = await post.find({user:id}).select('images');
    res.status(200).json(imagesByUser);
};

const createAssociateImages = async (req, res) => {
    const id = req.params.id;
    const {urlImages} = req.body;
    const foundPost = await post.findById(id);
    for(let image of urlImages) {foundPost.images.push(image)};
    await foundPost.save();
    res.status(201).json(foundPost);
};

const updateImage = async (req, res) => {
    const {id, id2} = req.params;
    const {url} = req.body;
    const foundPost = await post.findById(id);
    const image = foundPost.images.id(id2);
    image.url = url;
    await foundPost.save();
    res.status(200).json(image);
};

const deleteImage = async (req, res) => {
    const {id, id2} = req.params.id;
    const foundPost = await post.findById(id)
    const deletedImage = foundPost.images.id(id2).remove();
    await foundPost.save();
    res.status(200).json(deletedImage)
};

module.exports = {
    getPosts,
    getPostById,
    getPostsByUser,
    getPostsFull,
    createPost,
    updatePost,
    deletePost,
    getImages,
    getImageById,
    getImagesByUser,
    createAssociateImages,
    updateImage,
    deleteImage
};