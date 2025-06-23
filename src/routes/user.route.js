const {Router} = require('express');
const router = Router();
const {User} = require('../mongoSchemas');
const {userController} = require('../controllers');
const {userMiddleware, genericMiddleware, postMiddleware, imageMiddleware} = require('../middlewares');
const {userSchemas} = require('../schemas');

router.get("/", userController.getUsers);

router.get("/:id",
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(User),
    userController.getUserById
);

router.post("/",
    genericMiddleware.schemaValidator(userSchemas.userSchema),
    userMiddleware.nickNameValidation,
    userMiddleware.emailValidation,
    userMiddleware.fechaNacimientoValidation,
    userController.createUser
);

router.put("/:id",
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(User),
    genericMiddleware.schemaValidator(userSchemas.userSchema),
    userMiddleware.updateNickNameValidation,
    userMiddleware.updateEmailValidation,
    userMiddleware.fechaNacimientoValidation,
    userController.updateUser
);

router.delete("/:id",
    genericMiddleware.idValidation,
    genericMiddleware.idExistByModel(User),
    userController.deleteUser
);

module.exports = router;