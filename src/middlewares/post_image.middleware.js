const {post} = require('../mongoSchemas');

const urlsValidation = async (req, res, next) => {
    const {urlImages} = req.body;
    const images = await post.find({}).select('images -_id');
    const urls = images.flatMap(i => i.images).map(i => i.url);
    const urlsFound = urls.filter(u => urlImages.includes(u.url));
    if(urlsFound.length > 0) {
        return res.status(400).json(`imageMid urlValidation - La/s url/s ${urlsFound.map(u => u.url)} ya se encuentra/n registrada/s.`)
    };
    next();
};

const urlValidation = async (req, res, next) => {
    const {url} = req.body;
    const images = await post.find({}).select('images -_id');
    const urlFound = images.flatMap(i => i.images).find(i => i.url == url); //recibe array de objetos con prop url
    if(urlFound) {
        return res.status(400).json(`imageMid urlValidation - La url ${urlFound.url} ya se encuentra registrada.`)
    };
    next();
};

const idExistImage = async (req, res, next) => {
    const {id, id2} = req.params;
    const images = await post.find({}).select('images -_id');
    const idFound = images.flatMap(i => i.images).find(i => i._id == id2);
    if(!idFound)
        return res.status(404).json(`genericMid idExistByModel - Not Found: El id ${id} no se encuentra registrado.`);
    next();
};

module.exports = {urlsValidation, urlValidation, idExistImage};