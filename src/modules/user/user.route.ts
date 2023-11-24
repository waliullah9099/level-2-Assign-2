import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);

router.get('/users', userController.getUsers);

router.get('/users/:userId', userController.getSingleUser);

router.put('/users/:userId', userController.updateSingleUser);

export const userRouter = router;
