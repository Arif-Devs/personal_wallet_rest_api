import express from 'express';
const router = express.Router();
import authController from '../api/v1/controller/auth/index.js';
import { authRequest } from '../request/index.js';


//Health route
router.get('/health', (_req, res) =>
  res.status(200).json({ code: 200, message: 'api health is ok' })
);

// Auth endpoints
router.post('/auth/register',authRequest.registerRequestValidator, authController.register )

export default router;
