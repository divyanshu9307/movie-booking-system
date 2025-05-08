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

export const saveVoucher = async (voucherData) => {
    try {
        const voucher = new Voucher(voucherData);
        await voucher.save();
        return voucher;
    } catch (error) {
        logger.error('Error saving voucher', { error });
        throw new Error('Error saving voucher');
    }
}

export const findAllVouchers = async () => {
    try {
        const vouchers = await Voucher.find();
        return vouchers;
    } catch (error) {
        logger.error('Error finding all vouchers', { error });
        throw new Error('Error finding all vouchers');
    }
}

export const findByIdAndUpdateVoucher = async (id, updateData) => {
    try {
        const updatedVoucher = await Voucher.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        if (!updatedVoucher) {
            return null;
        }
        return updatedVoucher;
    } catch (error) {
        logger.error('Error updating voucher', { error });
        throw new Error('Error updating voucher');
    }
}