import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

// ========== User Related Api ===========

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

// ========== Order Related Api ===========

// put order
router.put('/users/:userId/orders', userController.addOrdersToUser);

// get all order from a specific user
router.get('/users/:userId/orders', userController.getAllOrderSingleUser);

// Calculate Total Price of Orders for a Specific User
router.get(
  '/users/:userId/orders/total-price',
  userController.calculateTotalPrice,
);

export const userRouter = router;
