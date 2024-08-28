import express from 'express';
import dotenv from 'dotenv';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
const swaggerSpec = YAML.load('./docs/swagger.yaml');
import router from './routes/index.js';
import { notFoundHandler, globalErrorHandler, middleware} from './middleware/index.js'

dotenv.config();
const app = express();


//Middleware
app.use(middleware)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Routs
app.use('/api/v1', router);

//Global error Handler
app.use([notFoundHandler, globalErrorHandler])


export default app;
