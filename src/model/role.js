import { Schema, model } from 'mongoose'

const roleSchema = new Schema({
    name: true,
    type: String,
    unique: true
},{ timestamps: true });


const Role = model('Role', roleSchema);

export default Role;