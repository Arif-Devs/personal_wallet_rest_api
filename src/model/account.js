import mongoose, { Schema, model } from 'mongoose';

const accountSchema = new Schema({
  name: {
    require: true,
    type: String,
  },
  accountDetails: {
    require: true,
    type: String,
  },
});
