import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config';

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'user id is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'user name is required'],
    unique: true,
  },
  password: { type: String, required: [true, 'password is required'] },
  fullName: {
    firstName: { type: String, required: [true, 'first name id is required'] },
    lastName: { type: String, required: [true, 'last name id is required'] },
  },
  age: { type: Number },
  email: {
    type: String,
    required: [true, 'email id is required'],
    unique: true,
  },
  isActive: { type: Boolean },
  hobbies: [{ type: String, required: [true, 'hobbies id is required'] }],
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});

// pre middleware to hashing password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycript_solt_rounds),
  );
  next();
});

// delete password field when response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// post save hook
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExists = async function (userId: number | string) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
