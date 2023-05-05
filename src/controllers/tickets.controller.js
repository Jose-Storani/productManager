import { createATicket } from "../services/ticket.service.js";

export const purchaseGenerator = async (req, res,next) => {
    try {
        const { amount, purchaser } = req.body;
    const ticketData = { amount, purchaser };
    const cartPurchaseData = req.newPurchaseCart
    const ticketCreated = await createATicket(ticketData);
    const userPurchase = {
        ticketCreated,
        cartPurchaseData
    }
    res.json({ compraRealizada: userPurchase })

    } catch (error) {
        next(error)
    }

}