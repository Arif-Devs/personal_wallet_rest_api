import {Schema, model} from 'mongoose'

const goalSchema = new Schema({
    name:{
        require: true,
        type: String
    },
    desired_date:{
        require: true,
        type: Date
    },
    target_amount:{
        require: true,
        type: Number
    },
    save_amount:{
        require: true,
        type: Number
    },
    userId:{
        require: true,
        type:
    }
},{timestamps: true})