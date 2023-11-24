import { User } from '../user.model';
import { TUser } from './user.interface';

// ========== User Related Api ===========
// create a user
const createUserFromDb = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

// get users
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

// get single user
const getSingleUserFromDb = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId }).select({ password: 0, _id: 0 });
  return result;
};

// update single user
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

// delete single user
const deleteSingleUserFromDb = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found');
  }
  const result = await User.deleteOne({ userId });
  return result;
};

// ========== Order Related Api ===========

//  get all order from a specif
const getAllOrderSingleUserFromDb = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId }).select({ orders: 1, _id: 0 });
  return result;
};

// Calculate Total Price of Orders for a Specific User
const calculateTotalPriceSpecificUser = async (userId: number | string) => {
  const userExists = await User.isUserExists(userId);
  if (!userExists) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId }).select({ orders: 1, _id: 0 });

  const totalPrice = (result?.orders || []).reduce(
    (total: number, order: { price?: number; quantity: number }) => {
      return total + (order.price || 0) * (order.quantity || 0);
    },
    0,
  );
  return totalPrice;
};

export const userServices = {
  createUserFromDb,
  getUsersFromDb,
  getSingleUserFromDb,
  updateUserFromDb,
  deleteSingleUserFromDb,
  getAllOrderSingleUserFromDb,
  calculateTotalPriceSpecificUser,
};
