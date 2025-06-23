const {Router} = require('express');
const router = Router();
const {postController} = require('../controllers');
const {postMiddleware, genericMiddleware, imageMiddleware} = require('../middlewares');
const {post, User} = require('../mongoSchemas');
const {postSchemas, imageSchemas} = require('../schemas');

router.get("/user/:id",
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(User),
    postController.getPostsByUser
);

router.get('/', postController.getPosts);

router.get('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(post),
    postController.getPostById
);

router.get("/full",
    postController.getPostsFull
);

router.post('/',
    genericMiddleware.schemaValidator(postSchemas.postSchema),
    genericMiddleware.idValidationBody('user'),
    genericMiddleware.idExistByModelBody(User, 'user'),
    postMiddleware.creadoValidation,
    postController.createPost
);

router.put('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(post),
    genericMiddleware.schemaValidator(postSchemas.updatePostSchema),
    postController.updatePost
);

router.delete('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(post),
    postController.deletePost
);

router.get('/images', postController.getImages);

router.get('/id/images/:id2',
    genericMiddleware.idValidation,
    imageMiddleware.idExistImage,
    postController.getImageById
);

router.get("/user/:id/images",
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(User),
    postController.getImagesByUser
);

router.post("/:id",
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(post),
    imageMiddleware.urlsValidation,
    genericMiddleware.schemaValidator(imageSchemas.urlImagesSchema),
    postController.createAssociateImages
);

router.put('/:id/images/:id2',
    genericMiddleware.idValidation,
    imageMiddleware.idExistImage,
    imageMiddleware.urlValidation,
    genericMiddleware.schemaValidator(imageSchemas.updateImageSchema),
    postController.updateImage
);

router.delete('/:id/images/:id2',
    genericMiddleware.idsValidation,
    imageMiddleware.idExistImage,
    genericMiddleware.idExistByModel(post),
    postController.deleteImage
);

module.exports = router;