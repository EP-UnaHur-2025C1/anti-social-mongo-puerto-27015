const mongoose = require('mongoose');
//necesito una url string de conexion q la toma de la var de entorno MONG_URL o
//del string:
//protocolo: mogodb://, user: root:, contraseña: example, use y contra estan configurados en bbdd admin coleccion user
//ip:puerto desde donde  me conecto a la bd: @localhost:27017
// bbdd a la que me conecto si no existe la crea:/libros
// nombre de la bbdd donde esta el user a autenticar con root:example: ?authSource=admin <- queryParameter
const MONGO_URL =
process.env.MONGO_URL ??
'mongodb://root:example@localhost:27017/anti-social-network?authSource=admin'
//con esto ya me puedo conectar con mongoose a la bbdd de mongo

let isConnected;

const connecToBBDD = async () => {
    if(!isConnected) {
        await mongoose.connect(MONGO_URL);
        console.log('conexion con mongo realizada con exito');
        isConnected = true;
    }
};

module.exports = {mongoose, connecToBBDD};


