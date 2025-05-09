import { Router } from 'express';
import { createFoodItem, getAllFoodItems, getFoodItemById, updateFoodItem } from '../controllers/food-item.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/getAllFoodItems', getAllFoodItems);
router.get('/getFoodItemBy/:id', getFoodItemById);
router.post('/createFoodItem', authMiddleware(['admin', 'manager']), createFoodItem);
router.put('/updateFoodItemBy/:id', authMiddleware(['admin', 'manager']), updateFoodItem);

export default router;