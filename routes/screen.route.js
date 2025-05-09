import { Router } from 'express';
import { createScreen, getAllScreens, getScreenById, updateScreen } from '../controllers/screen.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/getAllScreens', getAllScreens);
router.get('/getScreenBy/:id', getScreenById);
router.post('/addScreen', authMiddleware(['admin', 'manager']), createScreen);
router.put('/updateScreen/:id', authMiddleware(['admin', 'manager']), updateScreen);

export default router;