import { User } from './user.model';
import { TUser } from './user/user.interface';

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

export const userServices = {
  createUserFromDb,
  getUsersFromDb,
};
