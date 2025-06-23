const {post} = require('../mongoSchemas');

const creadoValidation =  async (req, res, next) => {
    const creado = new Date(req.body.creado);
    const hoy = new Date()
    if(creado>hoy)
        return res.status(400).json(`postMid creadoValidation - La fecha de creacion del post ${creado} no puede ser posterior a la fecha actual ${hoy}.`);
    next();
};

const postBeforeCommentValidation = async (req, res, next) => {
    const existingPost = await post.findByPk(req.params.id)
    const commentCreatedAt = req.body.creado;
    const postCreatedAt = existingPost.creado;
    if(postCreatedAt > commentCreatedAt)
        return res.status(400).json(`postMid postBeforeCommentValidation - La fecha de creacion del comentario ${commentCreatedAt} no puede ser anterior a la fecha de creacion del post ${postCreatedAt}.`);
    next();
};


module.exports = {creadoValidation, postBeforeCommentValidation};