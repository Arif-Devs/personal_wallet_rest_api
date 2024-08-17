import express from 'express';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
const swaggerSpec = YAML.load('./docs/swagger.yaml');
import router from './routes/index.js';

dotenv.config();
const app = express();
app.use(express.json());

//Middleware

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routs
app.use('/api/v1', router);

export default app;
