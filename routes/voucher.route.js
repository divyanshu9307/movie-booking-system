import { Router } from 'express';
import { createVoucher, getAllVouchers, getVoucherByCode, updateVoucher } from '../controllers/voucher.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllVouchers);
router.get('/:code', getVoucherByCode);
router.post('/', authMiddleware(['admin']), createVoucher);
router.put('/:id', authMiddleware(['admin']), updateVoucher);

export default router;