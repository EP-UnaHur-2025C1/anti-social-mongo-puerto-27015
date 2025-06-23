const {Router} = require('express');
const router = Router();
const {tagController} = require('../controllers');
const {tagMiddleware, genericMiddleware} = require('../middlewares');
const {Tag, post} = require('../mongoSchemas');
const {tagSchemas} = require('../schemas');

router.get('/', tagController.getTags);

router.get('/:id/posts',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getPostsByTag
);

router.get('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getTagById
);

router.get('/:id/users',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getUsersByTag
);

router.get('/:id/images',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.getImagesByTag
);

router.post('/',
    genericMiddleware.idValidationBody('post'),
    genericMiddleware.idExistByModelBody(post, 'post'),
    genericMiddleware.schemaValidator(tagSchemas.tagSchema),
    tagMiddleware.nombreValidation,
    tagController.createTag
);

router.post("/:id/create-tags",
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(post),
    genericMiddleware.schemaValidator(tagSchemas.createAndOrAssociateTagsSchema),
    tagController.createAndOrAssociateTags
);

router.put('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Tag),
    genericMiddleware.schemaValidator(tagSchemas.updateTagSchema),
    tagController.updateTag
);

router.delete('/:id',
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(Tag),
    tagController.deleteTag
);

module.exports = router;