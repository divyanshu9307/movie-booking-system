import Ticket from "../models/ticket.model.js";

export const saveTicket = async (ticketData) => {
    try {
        const ticket = new Ticket(ticketData);
        const savedTicket = await ticket.save();
        return savedTicket;
    } catch (error) {
        throw error;
    }
}