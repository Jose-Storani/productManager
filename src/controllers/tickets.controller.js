import {
  createATicket,
} from "../services/ticket.service.js";
import { ticketsDao } from "../dao/factory.js";


export const purchaseGenerator = async (req, res, next) => {
  try {
    const { amount, purchaser } = req.body;
    const ticketData = { amount, purchaser };
    const cartPurchaseData = req.newPurchaseCart;
    const ticketCreated = await createATicket(ticketData);
    const userPurchase = {
      ticketCreated,
      cartPurchaseData,
    };
    res.json({ compraRealizada: userPurchase });
  } catch (error) {
    next(error);
  }
};

export const getAllTickets = async (req, res) => {
  const tickets = await ticketsDao.getAll();
  res.json({ tickets });
};

export const deleteTicketById = async (req, res) => {
  const { tid } = req.params;
  const deletedTicket = await ticketsDao.deleteById(tid);
  res.json({ Eliminado: deletedTicket });
};

export const deleteTickets = async (req, res) => {
  const deletedTickets = await ticketsDao.deleteAll();
  res.json({ eliminado: deletedTickets });
};
