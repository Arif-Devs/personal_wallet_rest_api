import { Schema, model } from 'mongoose';

const incomeSchema = new Schema(
  {
    note: {
      require: false,
      type: String,
    },
    amount: {
      require: true,
      type: Number,
    },
    userId: {
      require: true,
      type: mongoose.Types.objectId,
    },
    categoryId: {
      require: true,
      type: mongoose.Types.objectId,
      ref: 'Category',
    },
    accountId: {
      require: true,
      type: mongoose.Types.objectId,
      ref: 'Account',
    },
  },{ timestamps: true });



const Income = model('Income', incomeSchema);

export default Income;
