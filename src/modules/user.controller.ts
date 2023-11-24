import { Request, Response } from 'express';
import UserValidationSchema from './user.validation';
import { userServices } from './user.service';

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

export const userController = {
  createUser,
};