import Voucher from "../models/voucher.model.js";

export const findVoucherByCode = async (code) => {
    try {
        const voucher = await Voucher.findOne({ code });
        if (!voucher) {
            return null;
        }
        return voucher;
    } catch (error) {
        logger.error('Error finding voucher by code', { error });
        throw new Error('Error finding voucher');
    }
}