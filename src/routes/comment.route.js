const {Router} = require('express');
const router = Router();
const {commentController} = require('../controllers');
const {commentMiddleware, genericMiddleware} = require('../middlewares');
const {User, Comment, post} = require('../mongoSchemas');
const {commentSchemas} = require('../schemas');

router.get('/', commentController.getComments);

router.get('/recent/post/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(post),
    commentController.getVisibleCommentsByPost
);

router.get('/recent', commentController.getVisibleComments);

router.get('/post/:id/user/:id2',
    genericMiddleware.idsValidation,
    genericMiddleware.idsExistByModel(post, User),
    commentController.getCommentsOnPostByUser
);

router.get("/user/:id",
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(User),
    commentController.getUserComments
);

router.get('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Comment),
    commentController.getCommentById
);

router.post('/',
    genericMiddleware.idValidationBody('user'),
    genericMiddleware.idExistByModelBody(User, 'user'),
    genericMiddleware.idValidationBody('post'),
    genericMiddleware.idExistByModelBody(post, 'post'),
    genericMiddleware.schemaValidator(commentSchemas.commentSchema),
    commentMiddleware.creadoValidation,
    commentController.createComment
);

router.put('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Comment),
    genericMiddleware.schemaValidator(commentSchemas.updateCommentSchema),
    commentController.updateComment
);

router.delete('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Comment),
    commentController.deleteComment
);

module.exports = router;
