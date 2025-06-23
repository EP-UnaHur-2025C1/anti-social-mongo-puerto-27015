const Joi = require('joi');

const userSchema = Joi.object({
    nickName:Joi.string().required().min(8).max(50).messages({
        "any.required":"El nickName es obligatorio.",
        "string.min": "El nickName debe tener {#limit} caracteres como minimo.",
        "string.max": "El nickName debe tener {#limit} caracteres como maximo .",
        "string.empty":"El campo nickName no puede estar vacio."
    }),
    fechaNacimiento:Joi.string().required().min(10).max(10).messages({
        "any.required":"La fecha de nacimiento es obligatoria.",
        "string.min": "La fecha de nacimiento debe tener {#limit} caracteres como minimo.",
        "string.max": "La fecha de nacimiento debe tener {#limit} caracteres como maximo.",
        "string.empty":"El campo fecha de nacimiento no puede estar vacio."
    }),
    email:Joi.string().required().email().messages({
        "any.required":"El email es obligatorio.",
        "string.email": "Debe ingresar un mail con formato valido. Ej: usuario@gmail.com.",
        "string.empty":"El campo email no puede estar vacio."
    }),
});

module.exports = {userSchema};
