import { Request, Response } from 'express';
import UserValidationSchema from './user.validation';
import { userServices } from './user.service';

// ========== User Related Api ===========

// create a user
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const zodParseSchema = UserValidationSchema.parse(userData);
    const result = await userServices.createUserFromDb(zodParseSchema);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'user create failed!',
      error: {
        code: 500,
        description: 'User create failed!',
        error: err,
      },
    });
  }
};

// get users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsersFromDb();
    res.status(200).json({
      success: true,

      message: 'Users fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// update single user
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    const result = await userServices.updateUserFromDb(userId, userData);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

//  delete single user
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.deleteSingleUserFromDb(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// ========== Order Related Api ===========

// get all order from a specific user
const getAllOrderSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getAllOrderSingleUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  getAllOrderSingleUser,
};
