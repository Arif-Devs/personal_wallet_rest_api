import { Schema, model } from 'mongoose';

const expanseSchema = new Schema(
  {
    note: {
      require: true,
      type: String,
    },
    amount: {
      require: true,
      type: Number,
    },
    userId: {
      require: true,
      type: mongoose.type.objectId,
      ref: 'User',
    },
    categoryId: {
      require: true,
      type: mongoose.type.objectId,
      ref: Category,
    },
    accountId: {
      require: true,
      type: mongoose.type.objectId,
      ref: 'Account',
    },
  },
  { timestamps: true }
);

const Expanse = model('Expanse', expanseSchema);
export default Expanse;
