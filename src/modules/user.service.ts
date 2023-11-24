import { User } from './user.model';
import { TUser } from './user/user.interface';

const createUserFromDb = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

export const userServices = {
  createUserFromDb,
};
