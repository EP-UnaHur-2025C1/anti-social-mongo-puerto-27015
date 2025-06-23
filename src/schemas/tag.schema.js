const Joi = require('joi');

const nombreSchema = Joi.string().required().min(2).max(25).messages({
    "any.required":"El tag es obligatorio.",
    "string.min": "El tag debe tener {#limit} caracteres como minimo.",
    "string.max": "El tag debe tener {#limit} caracteres como maximo .",
    "string.base": "El tag debe ser un string",
    "string.empty":"El tag no puede ser vacio."
});

const tagSchema = Joi.object({
    nombre: nombreSchema,
    post:Joi.string().required().messages({
        "any.required":"El id del post es obligatorio.",
    })
});

const createAndOrAssociateTagsSchema = Joi.object({
    tags: Joi.array().required().items(tagSchema).messages({
        "array.base":"tags debe ser un array.",
        "array.includesRequiredUnknowns":"El array de tags debe tener al menos un tag",
    })
});

const updateTagSchema = Joi.object({
    nombre:nombreSchema
});

module.exports = {tagSchema, createAndOrAssociateTagsSchema, tagsSchema, updateTagSchema};