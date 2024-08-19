import mongoose, { Schema, model } from 'mongoose';

const accountSchema = new Schema(
  {
    name: {
      require: true,
      type: String,
    },
    accountDetails: {
      require: true,
      type: String,
    },
    initialValue: {
      require: true,
      type: Number,
    },
    userId: {
      require: true,
      type: mongoose.type.objectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Account = model('Account', accountSchema);
export default Account;
