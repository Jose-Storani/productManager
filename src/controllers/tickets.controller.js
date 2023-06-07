import {
  createATicket,
} from "../services/ticket.service.js";
import { ticketsDao } from "../dao/factory.js";


export const purchaseGenerator = async (req, res, next) => {
  try {
	
    const { amount } = req.body;
    const ticketData = { amount, purchaser: req.session.userInfo.email };
		
		
    const cartPurchaseData = req.finalPurchaseCart;
		
		
    const ticketCreated = await createATicket(ticketData);
		console.log(ticketCreated)
    // const userPurchase = {
    //   ticketCreated,
    //   cartPurchaseData,
    // };
		// req.session.userInfo.purchaseData = userPurchase
		// console.log(req.session.userInfo.purchaseData)
    res.status(200).redirect("/purchaseSuccessful");
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
