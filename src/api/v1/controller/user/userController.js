import { userLibs } from "../../../../libs/index.js";
import User from "../../../../model/user.js";

const create = async(req, res, next)=>{
    const{userName, email, password,confirm_password,phone,roleId}= req.body

    const {user, accessToken}= await userLibs.registerOrCreateUser({userName, email, password,confirm_password,phone,roleId})
    res.status(201).json({
        code: 201,
        message: "user has been created!",
        data:{
            ...user._doc,
            accessToken
        }
    })
}

export default create