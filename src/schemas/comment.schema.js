const Joi = require('joi');

const contenidoSchema = Joi.string().required().min(2).max(8000).messages({
    "any.required":"El contenido es obligatorio.",
    "string.min": "El contenido debe tener {#limit} caracteres como minimo.",
    "string.max": "El contenido debe tener {#limit} caracteres como maximo .",
    "string.empty":"El contenido no puede ser vacio."
});

const creadoSchema = Joi.string().required().min(10).max(10).messages({
    "any.required":"La fecha de creacion es obligatorio.",
    "string.min": "La fecha de creacion debe tener {#limit} caracteres como minimo.",
    "string.max": "La fecha de creacion debe tener {#limit} caracteres como maximo .",
    "string.empty":"El contenido no puede ser vacio."
});

const commentSchema = Joi.object({
    contenido:contenidoSchema,
    creado:creadoSchema,
    user:Joi.string().required().messages({
        "any.required":"El id de usuario es obligatorio.",
    }),
    post:Joi.string().required().messages({
        "any.required":"El id del post es obligatorio.",
    })
});

const postCommentSchema = Joi.object({
    contenido:contenidoSchema,
    creado:contenidoSchema,
    user:Joi.string().required().messages({
        "any.required":"El id de usuario es obligatorio.",
    }),
});

const updateCommentSchema = Joi.object({
    contenido:contenidoSchema
});

module.exports = {commentSchema, postCommentSchema, updateCommentSchema};