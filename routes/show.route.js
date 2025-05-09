import { Router } from 'express';
import { createShow, getAllShows, getShowById, updateShow } from '../controllers/show.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { bookTicket } from '../controllers/booking.controller.js';

const router = Router();

router.get('/getAllShows', getAllShows);
router.get('/getShowBy/:id', getShowById);
router.post('/createShow', authMiddleware(['admin', 'manager']), createShow);
router.put('/updateShow/:id', authMiddleware(['admin', 'manager']), updateShow)

router.post('/bookTicket', authMiddleware(['customer']), bookTicket);

export default router;