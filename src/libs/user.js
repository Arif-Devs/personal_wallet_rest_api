import bcrypt from 'bcrypt'
import { addMinutes } from 'date-fns'
import User from '../model/user.js'
import { notFoundError, serverError } from '../utils/error.js'
import { tokenLibs } from './index.js'
import ip from 'ip'
import {DEFAULTPASS} from '../config/auth.js'
import Role from '../model/role.js'

// Register new user
const registerUser = async ({ userName, email, password, phone, roleId }) => {
    try {
        const hashPassword = await bcrypt.hash(password ? password : DEFAULTPASS, 10);
       
        // find role exists
        const userRole = await Role.findOne({ name: 'user' }).exec();
        if (!roleId && !userRole) {
            throw notFoundError('Please set a role or add a role named user')
        }
        // create user
        const user = new User({
            userName,
            email,
            phone: phone ? phone : '',
            password: hashPassword,
            roleId: roleId ? roleId : userRole._doc._id,

        });

        // Generate access & refresh token 
        const { accessToken, refreshToken } = tokenLibs.generateAccess_RefreshToken({ payload: { ...user. _doc, issuedIp: ip.address()}});
        user.refresh_token = refreshToken
        user.issuedIp = ip.address();
        await user.save();
        return {user, accessToken}
    } catch (error) {
        throw serverError(error.message)
    }
}

export default {registerUser};