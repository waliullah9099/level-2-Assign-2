import { User } from '../user.model';
import { TUser } from './user.interface';

const createUserFromDb = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getUsersFromDb = async () => {
  const result = await User.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
    _id: 0,
  });
  return result;
};

const getSingleUserFromDb = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId }).select({ password: 0, _id: 0 });
  return result;
};

const updateUserFromDb = async (userId: number | string, userData: object) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found');
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: userData, new: true, runValidators: true },
  ).select({ password: 0 });

  return result;
};
export const userServices = {
  createUserFromDb,
  getUsersFromDb,
  getSingleUserFromDb,
  updateUserFromDb,
};
