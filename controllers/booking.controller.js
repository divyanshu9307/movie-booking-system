import { createResponse } from '../utils/response.js';
import logger from '../utils/logger.js';
import { findByScreenIdAndFoodItemIds } from '../transaction/food-item.query.js';
import { findVoucherByCode } from '../transaction/voucher.query.js';
import { findTicketByIdAndUserId, findTicketsByUserId, saveTicket } from '../transaction/ticket.query.js';
import { findShowById } from '../transaction/show.query.js';

const calculateSeatPrice = (seats, seatGroups) => {
    let totalSeatPrice = 0;
    seats.forEach(seat => {
        const seatGroup = seatGroups.find(group => group.seats.some(row => row.some(s => s.seatNumber === seat)));
        if (seatGroup) {
            totalSeatPrice += seatGroup.price;
        }
    });
    return totalSeatPrice;
};

const calculateFoodPrice = (foodItems) => {
    return foodItems.reduce((acc, item) => {
        return acc + (item.totalPrice || 0);
    }, 0);
};

export const bookTicket = async (req, res) => {
    try {
        logger.info(`Booking ticket for user: ${req.user._id} for show: ${req.body.show}`);
        const { user, show: showId, seats, foodItems, voucherCode } = req.body;

        const show = await findShowById(showId);
        if (!show) {
            logger.error('Show not found', { showId });
            return res.status(404).json(createResponse('Show not found', null, 404));
        }

        const availableSeats = show.seatGroups.flatMap(group => group.seats.flatMap(row => row)).map(seat => seat.seatNumber);
        const invalidSeats = seats.filter(seat => !availableSeats.includes(seat));
        if (invalidSeats.length > 0) {
            logger.error('Invalid seats', { invalidSeats });
            return res.status(400).json(createResponse(`Seats ${invalidSeats.join(', ')} are not available`, null, 400));
        }

        if (foodItems && foodItems.length > 0) {
            const foodItemIds = foodItems.map(item => item.foodItem);
            const validFoodItems = await findByScreenIdAndFoodItemIds(show.screen._id, foodItemIds);

            const validIds = validFoodItems.map(f => f._id.toString());
            const invalidItems = foodItemIds.filter(id => !validIds.includes(id));

            if (invalidItems.length > 0) {
                logger.error('Invalid food items for screen', { invalidItems });
                return res.status(400).json(createResponse('One or more food items are invalid for this screen.', null, 400));
            }

            foodItems.forEach(item => {
                const foodItem = validFoodItems.find(f => f._id.toString() === item.foodItem);
                if (foodItem) {
                    item.price = foodItem.price;
                    item.totalPrice = foodItem.price * item.quantity;
                }
            })
        }

        const seatPrice = calculateSeatPrice(seats, show.seatGroups);
        const foodPrice = foodItems ? calculateFoodPrice(foodItems) : 0;

        let discountAmount = 0;
        let totalAmount = seatPrice + foodPrice;

        let voucherDoc = null;

        if (voucherCode) {
            voucherDoc = await findVoucherByCode(voucherCode);
            if (voucherDoc && voucherDoc.status === 'Active' && voucherDoc.validFrom <= new Date() && voucherDoc.validUntil >= new Date() && voucherDoc.minAmount <= totalAmount) {
                if (voucherDoc.discountType === 'Fixed' && voucherDoc.discountValue > 0 && voucherDoc.discountValue <= totalAmount) {
                    discountAmount = Math.min(voucherDoc.discountValue, totalAmount);
                } else if (voucherDoc.discountType === 'Percentage' && voucherDoc.discountValue > 0 && voucherDoc.discountValue <= 100) {
                    discountAmount = (totalAmount * voucherDoc.discountValue) / 100;
                }
            }
        }

        const finalAmount = totalAmount - discountAmount;

        const savedTicket = await saveTicket({
            user,
            show: showId,
            seats: seats.map(seat => ({ seatNumber: seat, price: seatPrice })),
            foodItems,
            voucher: voucherCode ? voucherDoc._id : null,
            totalAmount,
            discountAmount,
            finalAmount,
            paymentStatus: 'Pending',
            status: 'Payment_Pending'
        });

        logger.info(`Seats reserved for user: ${user} for show: ${showId} with seats: ${seats.join(', ')}`);
        res.status(201).json(createResponse('Seats have been reserved, pay to book the tickets', savedTicket, 201));
    } catch (error) {
        logger.error('Error booking ticket', { error: error.message });
        res.status(500).json(createResponse('Error booking ticket', error.message, 500));
    }
};


export const getMyBookings = async (req, res) => {
    try {
        const userId = req.user._id;
        logger.info(`Fetching bookings for user: ${userId}`);

        const tickets = await findTicketsByUserId(userId);

        res.status(200).json(createResponse('Bookings fetched successfully', tickets, 200));
    } catch (error) {
        logger.error(`Error fetching bookings: ${error.message}`);
        res.status(500).json(createResponse('Error fetching bookings', null, 500));
    }
};

export const getBookingDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const ticketId = req.params.id;

        const ticket = await findTicketByIdAndUserId(ticketId, userId);

        if (!ticket) {
            return res.status(404).json(createResponse('Booking not found', null, 404));
        }

        res.status(200).json(createResponse('Booking details fetched successfully', ticket, 200));
    } catch (error) {
        logger.error(`Error fetching booking details: ${error.message}`);
        res.status(500).json(createResponse('Error fetching booking details', null, 500));
    }
};
