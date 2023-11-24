import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

// create a user
router.post('/users', userController.createUser);

// get users
router.get('/users', userController.getUsers);

// get single user
router.get('/users/:userId', userController.getSingleUser);

// update single user
router.put('/users/:userId', userController.updateSingleUser);

// delete single user
router.delete('/users/:userId', userController.deleteSingleUser);

export const userRouter = router;
