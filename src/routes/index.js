import express from 'express';
const router = express.Router();
import authController from '../api/v1/controller/auth/index.js';
import PermissionController from '../api/v1/controller/permission/index.js';
import RoleController from '../api/v1/controller/role/index.js';
import userController from '../api/v1/controller/user/index.js'
import  {authRequest, userRequest}  from '../request/index.js';
import  {requestValidator, authenticate, authorization}  from '../middleware/index.js';
import  {permissionRequest}  from '../request/index.js';




//Health route
router.get('/health', (_req, res) =>
  res.status(200).json({ code: 200, message: 'api health is ok' })
);




// Auth endpoints
 router.post('/auth/register', authRequest.registerRequestValidator, requestValidator, authController.register )




 //Permission Routes ->
 router.route('/permissions')
 
 //TODO add authentication and authorization middleware -> authenticate, authorization(['create-permission'])
.post(permissionRequest.permissionCreateRequest,requestValidator,PermissionController.create)




//Role route
router.route('/roles')
.post(RoleController.create)


//User route ->
router.route('/users')
.post( userRequest.createRequestValidator, requestValidator, userController.create)//TODO add authenticate, authorization middleware
.get(userController.getAll)








export default router;