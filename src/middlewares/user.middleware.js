const {User} = require('../mongoSchemas');

const nickNameValidation =  async (req, res, next) => {
    const {nickName} = req.body;
    const nickNameFound = await User.findOne({nickName});
    if(nickNameFound)
        return res.status(400).json(`userMid nickNameValidation - El nickName ${nickName} ya se encuentra registrado.`);
    next();
};

const emailValidation =  async (req, res, next) => {
    const {email} = req.body;
    const emailFound = await User.findOne({email});
    if(emailFound)
        return res.status(400).json(`userMid emailValidation - El email ${email} ya se encuentra registrado.`);
    next();
};

const updateNickNameValidation =  async (req, res, next) => {
    const {nickName} = req.body;
    const userFoundByNickName = await User.findOne({nickName});
    if(userFoundByNickName && (userFoundByNickName.id != req.params.id)) {
        return res.status(400).json(`userMid updateNickNameValidation - El nickName ${nickName} ya se encuentra registrado.`);
    }
    next();
};

const updateEmailValidation =  async (req, res, next) => {
    const {email} = req.body;
    const userFoundByEmail = await User.findOne({email});
    if(userFoundByEmail && (userFoundByEmail.id != req.params.id))
        return res.status(400).json(`userMid updateEmailValidation - El email ${email} ya se encuentra registrado.`);
    next();
};

const fechaNacimientoValidation =  async (req, res, next) => {
    const fechaNacimiento = new Date(req.body.fechaNacimiento);
    const hoy = new Date()
    if(fechaNacimiento > hoy)
        return res.status(400).json(`userMid fechaNacimientoValidation - La fecha de nacimiento ${fechaNacimiento} no puede ser posterior a la fecha actual ${hoy}.`);
    next();
};

module.exports = {
    nickNameValidation,
    emailValidation,
    fechaNacimientoValidation,
    updateNickNameValidation,
    updateEmailValidation
};