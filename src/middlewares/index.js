const userMiddleware = require('./user.middleware');
const postMiddleware = require('./post.middleware');
const imageMiddleware = require('./post_image.middleware');
const tagMiddleware = require('./tag.middleware');
const commentMiddleware = require('./comment.middleware');
const genericMiddleware = require('./generic.middleware');

module.exports = {
    userMiddleware,
    postMiddleware,
    imageMiddleware,
    tagMiddleware,
    commentMiddleware,
    genericMiddleware
};