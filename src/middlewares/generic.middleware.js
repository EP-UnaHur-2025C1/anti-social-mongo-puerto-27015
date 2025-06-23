const idValidation = (req, res, next) => {
    const id = req.params.id;
    if(id <= 0)
        return res.status(400).json('genericMid idValidation - Bad Request: El id no puede ser cero o negativo')
    next()
};

const idExistByModel = (model) => {
    return  async (req, res, next) => {
        const id = req.params.id;
        const idFound = await model.findById(id);
        if(!idFound)
            return res.status(404).json(`genericMid idExistByModel - Not Found: El id ${id} no se encuentra registrado.`);
        next();
    };
};

const idValidationBody = (idModel) => {
    return  async (req, res, next) => {
        const id = req.body[idModel];
        if(id <= 0)
            return res.status(400).json(`genericMid IdValidationBody - Bad Request: El id no puede ser cero o negativo`)
        next();
    };
};

const idExistByModelBody = (model, idModel) => {
    return  async (req, res, next) => {
        const id = req.body[idModel];
        const idFound = await model.findById(id);
        if(!idFound)
            return res.status(404).json(`genericMid IdExistByModelBody - Not Found: El id ${id} no se encuentra registrado.`);
        next();
    };
};

const idsValidation = (req, res, next) => {
    const {id, id2} = req.params;
    if(id <= 0 || id2 <=0)
        return res.status(400).json(`commentMid idsValidation - Bad Request: El id ${id<=0 && id2<=0 ? `${id} y el id ${id2} no pueden`:id<=0 ? `${id} no puede`:`${id2} no puede`} ser cero o negativo`)
    next()
};

const idsExistByModel = (model1, model2) => {
    return  async (req, res, next) => {
        const {id, id2} = req.params;
        const idFound = await model1.findByPk(id);
        const id2Found = await model2.findByPk(id2);
        if(!id2Found || !idFound)
            return res.status(404).json(
                `${!id2Found && !idFound ?
                    `commentMid idsExistByModel - Not Found: El id ${id} y el id ${id2} no se encuentran registrados`:
                    `commentMid idsExistByModel - Not Found: El id ${!idFound ? id2:id} no se encuentra registrado`}`)
        next();
    };
};


const schemaValidator = (schema) => {
    return (req, res, next) => {
        const {error, _} = schema.validate(req.body, {abortEarly:false});
        if(error){
            const errores = error.details.map(e => {
                return {atributo:e.path[0], mensaje:e.message, tipoError:e.type}
            });
            return res.status(400).json(errores);
        }
        next()
    }
}

module.exports = {
    idValidation,
    idValidationBody,
    idExistByModelBody,
    idExistByModel,
    schemaValidator,
    idsValidation,
    idsExistByModel
};