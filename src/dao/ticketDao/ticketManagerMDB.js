
import CommonMethods from "../commonMethods.js";
import { ticketModel } from "../mongoDB/models/ticket.model.js";

export default class TicketManager extends CommonMethods{
    constructor(model){
        super(model)
    }
    async createTicket(newTicket) {
        const response = await ticketModel.create(newTicket)
        return response

    }

}