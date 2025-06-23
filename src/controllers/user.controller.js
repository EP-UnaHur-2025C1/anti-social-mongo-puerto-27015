const {User, post} = require('../mongoSchemas');

const getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
};

const createUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const userUpdated = await User.findOneAndUpdate({id}, {$set:req.body}, {new:true})
    res.status(201).json(userUpdated);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const posts = await post.find({user:id});
    for(let p of posts) {await Comment.deleteMany({post:p._id})};
    await Comment.deleteMany({user:id});
    await post.deleteMany({user:id});
    const userDeleted = await User.findByIdAndDelete(id);
    res.status(200).json(userDeleted);
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser
};