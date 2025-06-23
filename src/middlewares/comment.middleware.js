const {Comment} = require('../mongoSchemas');

const creadoValidation =  async (req, res, next) => {
    const creado = new Date(req.body.creado);
    const hoy = new Date()
    if(creado > hoy)
        return res.status(400).json(`commentMid creadoValidation - La fecha de creacion ${creado} no puede ser posterior a la fecha actual ${hoy}.`);
    next();
};

module.exports = {creadoValidation};
