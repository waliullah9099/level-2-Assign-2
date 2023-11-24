import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/users', userController.createUser);

export const userRouter = router;
