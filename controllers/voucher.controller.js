import { createResponse } from '../utils/response.js';
import logger from '../utils/logger.js';
import { findAllVouchers, findByIdAndUpdateVoucher, findVoucherByCode, saveVoucher } from '../transaction/voucher.query.js';

export const createVoucher = async (req, res) => {
    try {
        logger.info(`Creating voucher with code: ${req.body.code}`);

        const existingVoucher = await findVoucherByCode(req.body.code);
        if (existingVoucher) {
            logger.warn('Voucher code already exists:', req.body.code);
            return res.status(400).json(createResponse('Voucher code already exists', null, 400));
        }

        const savedVoucher = await saveVoucher(req.body);

        logger.info(`Voucher created successfully with code: ${req.body.code}`);
        res.status(201).json(createResponse('Voucher created', savedVoucher, 201));
    } catch (error) {
        logger.error('Error creating voucher:', error);
        res.status(400).json(createResponse('Error creating voucher', error.message, 400));
    }
};

export const getAllVouchers = async (req, res) => {
    try {
        logger.info('Fetching all vouchers');
        const vouchers = await findAllVouchers();
        res.status(200).json(createResponse('Vouchers fetched', vouchers, 200));
    } catch (error) {
        logger.error('Error fetching vouchers:', error);
        res.status(500).json(createResponse('Error fetching vouchers', error.message, 500));
    }
};

export const getVoucherByCode = async (req, res) => {
    try {
        logger.info(`Fetching voucher with code: ${req.params.code}`);
        const voucher = await findVoucherByCode(req.params.code);

        if (!voucher) {
            logger.warn(`Voucher not found with code: ${req.params.code}`);
            return res.status(404).json(createResponse('Voucher not found', null, 404));
        }

        res.status(200).json(createResponse('Voucher fetched', voucher, 200));
    } catch (error) {
        logger.error('Error fetching voucher:', error);
        res.status(500).json(createResponse('Error fetching voucher', error.message, 500));
    }
};

export const updateVoucher = async (req, res) => {
    try {
        logger.info(`Updating voucher with ID: ${req.params.id}`);
        const { code, ...updateData } = req.body;

        const updatedVoucher = await findByIdAndUpdateVoucher(req.params.id, updateData);

        if (!updatedVoucher) {
            logger.warn(`Voucher not found with ID: ${req.params.id}`);
            return res.status(404).json(createResponse('Voucher not found', null, 404));
        }

        res.status(200).json(createResponse('Voucher updated', updatedVoucher, 200));
    } catch (error) {
        logger.error('Error updating voucher:', error);
        res.status(400).json(createResponse('Error updating voucher', error.message, 400));
    }
};