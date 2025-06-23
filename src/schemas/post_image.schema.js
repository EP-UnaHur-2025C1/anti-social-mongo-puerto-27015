const Joi = require('joi');

const urlSchema = Joi.string().required().min(5).max(75).messages({
    "any.required":"El campo url es obligatorio.",
    "string.min": "El campo url debe tener {#limit} caracteres como minimo.",
    "string.max": "El campo url debe tener {#limit} caracteres como maximo .",
    "string.base": "La url debe ser un string",
    "string.empty":"El campo url no puede ser vacio."
});

const imageSchema = Joi.object({
    url:urlSchema,
    post:Joi.string().required().messages({
        "any.required":"El id del post es obligatorio.",
    })
});

const urlImagesSchema = Joi.object({
    urlsImages:Joi.array().required().items(imageSchema).messages({
        "array.base":"urlImages debe ser un array.",
        "array.includesRequiredUnknowns":"El array de imagenes debe tener al menos una url"
    })
});

const updateImageSchema = Joi.object({
    url:urlSchema
});

module.exports = {imageSchema, urlImagesSchema, updateImageSchema};