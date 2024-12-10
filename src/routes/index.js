import express from 'express';
const router = express.Router();
import authController from '../api/v1/controller/auth/index.js';
import  {authRequest}  from '../request/index.js';
import PermissionController from '../api/v1/controller/permission/index.js';
import RoleController from '../api/v1/controller/role/index.js';
import  {requestValidator, authenticate, authorization}  from '../middleware/index.js';
import  {permissionRequest}  from '../request/index.js';


//Health route
router.get('/health', (_req, res) =>
  res.status(200).json({ code: 200, message: 'api health is ok' })
);

// Auth endpoints
 router.post('/auth/register',authRequest.registerRequestValidator, authController.register )

//Permission Routes->
//TODO add authentication and authorization middleware -> authenticate, authorization(['create-permission'])
 router.route('/permissions')
.post(permissionRequest.permissionCreateRequest,requestValidator,PermissionController.create)

//Role route
router.route('/roles')
.post(RoleController.create)





export default router;