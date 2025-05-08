import Ticket from "../models/ticket.model.js";
import logger from "../utils/logger.js";

export const saveTicket = async (ticketData) => {
    try {
        const ticket = new Ticket(ticketData);
        const savedTicket = await ticket.save();
        return savedTicket;
    } catch (error) {
        logger.error(`Error saving ticket: ${error.message}`);
        throw error;
    }
}

export const findTicketsByUserId = async (userId) => {
    try {
        const tickets = await Ticket.find({ user: userId })
            .populate('show', 'movie startAt screen')
            .populate('foodItems.foodItem', 'name price')
            .populate('voucher', 'code discountType discountValue')
            .sort({ bookingDate: -1 });
        return tickets;
    } catch (error) {
        logger.error(`Error fetching tickets for user ${userId}: ${error.message}`);
        throw error;
    }
}


export const findTicketByIdAndUserId = async (ticketId, userId) => {
    try {
        const ticket = await Ticket.find({ _id: ticketId, user: userId })
            .populate('show', 'movie startAt screen')
            .populate('foodItems.foodItem', 'name price')
            .populate('voucher', 'code discountType discountValue');
        return ticket;
    } catch (error) {
        logger.error(`Error fetching ticket ${ticketId} for user ${userId}: ${error.message}`);
        throw error;
    }
}