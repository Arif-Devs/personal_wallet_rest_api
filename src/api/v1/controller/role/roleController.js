import { roleLibs } from '../../../../libs/index.js'

//create role
const create = async (req,res,next)=>{
    try {
        const {name,permissions} = req.body
        const {role,permission} = await roleLibs.create(name, permissions)

        res.status(201).json({
            code: 201,
            message: 'Role has been created!',
            data:{
                ...role,
                permission:permission?[...permission]:[]
            }
        })
    } catch (error) {
        next(error)
    }
}

export default create