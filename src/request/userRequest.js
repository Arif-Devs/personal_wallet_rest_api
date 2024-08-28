import { body } from "express-validator";
import bcrypt from 'bcrypt'
import User from '../model/user.js'

// validation check for email
const isEmailUnique = async (email) => {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
        return Promise.reject('Email is already registered')
    };
};

//validation for phone number

const isPhoneUnique = async (phone) => {
    const phoneExist = await User.findOne({ phone })
    if (phoneExist) {
        return Promise.reject('Phone Number is already registered')
    }
}

// validation for input userName

const isUserName = (value) => {
    return /^[a-zA-Z0-9_]+$/.test(value);
}

// validation for input email

const isEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// sign request body validator
const createRequestValidator = [
    body('userName')
    .trim()
    .isAlphanumeric()
    .withMessage('User name must be a valid text format')
    .bail()
    .isLength({ min: 5, max: 12 })
    .withMessage('Username must be between 5-10 characters')
    .custom(async (value) => {
        const userExist = User.findOne({ userName: value })
        if (userExist) {
            throw new Error('User name already exist')
        };
    }),
    body('email')
        .isEmail().withMessage('Enter valid email')
        .custom(isEmailUnique),
    
    body('phone')
        .optional()
        .isMobilePhone('any').withMessage('Enter valid phone number')
        .custom(isPhoneUnique),
    body('password')
        .optional()
        .trim()
        .isLength({ min: 6, max: 12 })
        .withMessage('Password must be between 5-10 characters')
        .bail()
        .isStrongPassword()
        .withMessage('Password must be strong'),
    body('confirm_password')
        .optional()
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('password not match')
            }
        })
];

//sing request body validator





export default {createRequestValidator};