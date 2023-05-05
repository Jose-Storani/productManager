
import { ticketModel } from "../mongoDB/models/ticket.model.js";

export default class TicketManager {
    async createTicket(newTicket) {
        const response = await ticketModel.create(newTicket)
        return response

    }

    async getTickets() {
        const ticketsData = await ticketModel.find({});
        return ticketsData
    }
}