const Joi = require('joi');

const descripcionSchema = Joi.string().required().min(10).max(254).messages({
    "any.required":"La descripcion es obligatoria.",
    "string.min": "La descripcion debe tener {#limit} caracteres como minimo.",
    "string.max": "La descripcion debe tener {#limit} caracteres como maximo .",
    "string.empty":"El campo descripcion no puede estar vacio."
});

const postSchema = Joi.object({
    descripcion:descripcionSchema,
    creado:Joi.string().required().min(10).max(10).messages({
        "any.required":"La fecha de creacion es obligatorio.",
        "string.min": "La fecha de creacion debe tener {#limit} caracteres como minimo.",
        "string.max": "La fecha de creacion debe tener {#limit} caracteres como maximo .",
        "string.empty":"El campo descripcion no puede estar vacio."
    }),
    user:Joi.string().required().messages({
        "any.required":"El id de usuario es obligatorio.",
    })
});

const updatePostSchema = Joi.object({
    descripcion:descripcionSchema
});

module.exports = {
    postSchema,
    updatePostSchema
};