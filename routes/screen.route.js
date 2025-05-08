
import { Router } from 'express';
import { createScreen, getAllScreens, getScreenById, updateScreen } from '../controllers/screen.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllScreens);
router.get('/:id', getScreenById);
router.post('/', authMiddleware(['admin', 'manager']), createScreen);
router.put('/', authMiddleware(['admin', 'manager']), updateScreen);

export default router;