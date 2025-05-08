import { Router } from 'express';
import { createShow, getAllShows, getShowById, updateShow } from '../controllers/show.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { bookTicket } from '../controllers/ticket.controller.js';

const router = Router();

router.get('/', getAllShows);
router.get('/:id', getShowById);
router.post('/', authMiddleware(['admin', 'manager']), createShow);
router.put('/', authMiddleware(['admin', 'manager']), updateShow);

router.post('/book', authMiddleware(['user']), bookTicket);

export default router;