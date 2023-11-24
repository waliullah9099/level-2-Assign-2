import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config';

const userSchema = new Schema<TUser>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
  age: { type: Number },
  email: { type: String, required: true, unique: true },
  isActive: { type: Boolean },
  hobbies: [{ type: String }],
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
