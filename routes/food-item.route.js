import { Router } from 'express';
import { createFoodItem, getAllFoodItems, getFoodItemById, updateFoodItem } from '../controllers/food-item.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllFoodItems);
router.get('/:id', getFoodItemById);
router.post('/', authMiddleware(['admin', 'manager']), createFoodItem);
router.put('/:id', authMiddleware(['admin', 'manager']), updateFoodItem);

export default router;