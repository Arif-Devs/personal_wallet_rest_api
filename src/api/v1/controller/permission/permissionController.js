import {LIMIT,PAGE,SEARCH,SORTBY,SORTTYPE} from '../../../../config/default.js'
import {permissionLibs} from '../../../../libs/index.js'
import {generateAllDataHateoasLinks} from '../../../../utils/hateoas.js'
import generatePagination from '../../../../utils/pagination.js'
import transformMongooseDocs from '../../../../utils/response.js'

//Create permission
const create = (async (req, res, next)=>{
    const {name} = req.body
    const permission = await permissionLibs.createPermission(name)

    // Send response to user
    res.status(200).json({
        code:200,
        message:"Permission has been created!",
        data: {...permission}
    })
})

export default {create}