import { Router } from 'express';
import { createVoucher, getAllVouchers, getVoucherByCode, updateVoucher } from '../controllers/voucher.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/getAllVouchers', getAllVouchers);
router.get('/getVoucherBy/:code', getVoucherByCode);
router.post('/createVoucher', authMiddleware(['admin']), createVoucher);
router.put('/updateVoucherBy/:id', authMiddleware(['admin']), updateVoucher);

export default router;