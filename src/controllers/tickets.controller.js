import { createATicket } from "../services/ticket.service.js";

export const purchaseGenerator = async (req, res) => {
    const { amount, purchaser } = req.body;
    const ticketData = { amount, purchaser };
    const cartPurchaseData = req.newPurchaseCart
    const ticketCreated = await createATicket(ticketData);
    const userPurchase = {
        ticketCreated,
        cartPurchaseData
    }
    res.json({ compraRealizada: userPurchase })
}