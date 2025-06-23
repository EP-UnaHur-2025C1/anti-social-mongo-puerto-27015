const express = require('express');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
require('dotenv').config();
const PORT = parseInt(process.env.PORT, 10) || 3010;
const {connecToBBDD} = require('./db/mongodb');

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load('./src/docs/Documentacion_API_Red_Anti-Social.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/users', routes.userRoute);
app.use('/posts', routes.postRoute);
app.use('/comments', routes.commentRoute);
app.use('/tags', routes.tagRoute);
app.use('/images', routes.imageRoute);

app.listen(PORT, async (error) => {
    if(error) {
        console.log(error.message);
        process.exit(1);
    };
    try {
        await connecToBBDD();
    }catch(dbError) {
        console.log(dbError.message);
        process.exit(1);
        
    }
    console.log(`App iniciada http://0.0.0.0 ${PORT}`)
});