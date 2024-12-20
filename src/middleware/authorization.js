import { permissionLibs } from "../libs/index.js";
import Role from "../model/role.js";
import { unAuthenticateError, unAuthorizedError } from "../utils/error.js";

const authorization = (requiredPermission=[])=>async(req, res, next)=>{
    try {
        
        //find roleId, permission based roleId 
        const existRole = await Role.findById(req.user.roleId).exec()
        const userPermission = await permissionLibs.getPermissionsNameBasedOnRoleId(req.user.roleId)||[]
        const roleName = existRole._doc.name.toLowerCase()

        req.permissions = {
            requiredPermission,
            userPermission: userPermission.flat(),
            userRole: roleName
        }

        if(['admin', 'super-admin'].includes(roleName)){
            return next()
        }else{
            // Check if the user has any of the requiredPermissions
            const hasRequiredPermission = requiredPermission.some((requiredPermission)=>{
                return userPermission.flat().includes(requiredPermission)
            }) 

            if(!hasRequiredPermission){
                throw unAuthenticateError()
            }
            next()
        }



        
    } catch (error) {
        next(error)
    }
}

export default authorization