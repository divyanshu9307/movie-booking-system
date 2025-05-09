
import { Router } from 'express';
import { getBookingDetails, getMyBookings } from '../controllers/booking.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/getAllbookings', authMiddleware['customer'], getMyBookings);
router.get('/getBookingBy/:id', authMiddleware['customer'], getBookingDetails);

export default router;