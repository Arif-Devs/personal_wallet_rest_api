import { Schema, model } from 'mongoose';

const permissionRoleSchema = new Schema(
  {
    roleid: {
      required: true,
      type: mongoose.Types.ObjectId,
      ref: 'Role',
      unique: false,
    },
    permissionId: {
      require: true,
      type: mongoose.Types.ObjectId,
      ref: 'Permission',
      unique: false,
    },
  
},{ timestamps: true });



const PermissionRole = model('PermissionRole', permissionRoleSchema);

export default PermissionRole;
