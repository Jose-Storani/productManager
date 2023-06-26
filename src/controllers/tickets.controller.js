import { createATicketService } from "../services/ticket.service.js";
import { ticketsDao } from "../dao/factory.js";
import { transporter } from "../mensajeria/nodemailer.js";

export const purchaseGenerator = async (req, res, next) => {
	try {
		const { amount } = req.body;
		const cartId = req.cartId;
		const cartData = req.finalPurchaseCart;
		const ticketData = {
			amount,
			purchaser: req.session.userInfo.email,
			cartData,
		};
		
		const ticketCreated = await createATicketService(ticketData);
		const userPurchase = {
			ticketCreated,
			cartData,
			cartId,
		};
		req.session.userInfo.purchaseData = userPurchase;


		let detailDisplay = "";
		cartData.forEach((product) => {
			detailDisplay +=
				product.productId.title + "\n" + "quantity: " + product.quantity;
		});

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

		res.status(200).redirect("/purchase-successful");
	} catch (error) {
		next(error);
	}
};

export const getAllTickets = async (req, res) => {
	const tickets = await ticketsDao.getAll();
	res.json({ tickets });
};

export const getTicketByNumber = async (req, res, next) => {
	try {
		const { ticketNumber } = req.body;
		const ticket = await ticketsDao.findTicket(ticketNumber);
		res.status(200).send(ticket);
	} catch (error) {
		next(error);
	}
};

export const deleteTicketById = async (req, res) => {
	try {
		const { tid } = req.params;
		const deletedTicket = await ticketsDao.deleteById(tid);
		res.json({ Eliminado: deletedTicket });
	} catch (error) {
		next(error);
	}
};

export const deleteTickets = async (req, res) => {
	try {
		const deletedTickets = await ticketsDao.deleteAll();
		res.json({ eliminado: deletedTickets });
	} catch (error) {
		next(error);
	}
};
