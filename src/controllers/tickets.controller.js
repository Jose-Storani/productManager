import { createATicket } from "../services/ticket.service.js";
import { ticketsDao } from "../dao/factory.js";
import { transporter } from "../mensajeria/nodemailer.js";

export const purchaseGenerator = async (req, res, next) => {
	try {
		const { amount} = req.body;
		const cartId = req.cartId;
		const cartPurchaseData = req.finalPurchaseCart;
		const ticketData = { amount, purchaser: req.session.userInfo.email,cartPurchaseData};
		const ticketCreated = await createATicket(ticketData);
		const userPurchase = {
			ticketCreated,
			cartPurchaseData,
			cartId
		};
		req.session.userInfo.purchaseData = userPurchase;

		let detailDisplay = "";
		cartPurchaseData.forEach((product)=>{
			detailDisplay+= product.productId.title + "\n" + "quantity: " + product.quantity
		})


		//envío de mail
		await transporter.sendMail({
			from: "Jose Storani",
			to: `${ticketCreated.purchaser}`,
			subject: "Comprobante de compra",
			text: `Muchas gracias por su compra. Su detalle:
		Numero de ticket: ${ticketCreated.ticketCode}
		Fecha de compra: ${ticketCreated.purchase_dateTime}
		Monto total: $${amount}
		Detalle artículos: ${detailDisplay}
		`,
		});

		res.status(200).redirect("/purchaseSuccessful");
	} catch (error) {
		next(error);
	}
};

export const getAllTickets = async (req, res) => {
	const tickets = await ticketsDao.getAll();
	res.json({ tickets });
};

export const getTicketByNumber = async (req,res,next)=>{
	try {
		const {ticketNumber} = req.body
		const ticket = await ticketsDao.findTicket(ticketNumber);
		res.status(200).send(ticket)
		
	} catch (error) {
		next(error)
	}
}

export const deleteTicketById = async (req, res) => {
	const { tid } = req.params;
	const deletedTicket = await ticketsDao.deleteById(tid);
	res.json({ Eliminado: deletedTicket });
};

export const deleteTickets = async (req, res) => {
	const deletedTickets = await ticketsDao.deleteAll();
	res.json({ eliminado: deletedTickets });
};
