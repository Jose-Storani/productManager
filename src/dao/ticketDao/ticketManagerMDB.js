
import { ticketModel } from "../mongoDB/models/ticket.model.js";

export default class TicketManager{
    async createTicket(newTicket){
        try {           
            const response = await ticketModel.create(newTicket)
            return response
        } catch (error) {
            console.log(error)
                }
    }

    async getTickets(){
        try {
            const ticketsData = await ticketModel.find({});
            return ticketsData
        } catch (error) {
            console.log(error)
        }
    }
}