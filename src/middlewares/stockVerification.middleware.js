import { cartDao, productsDao } from "../dao/factory.js";

export const stockVerification = async (req, res, next) => {
	const { cid } = req.params;
	req.cartId = cid;
	const purchaserCart = await cartDao.getById(cid);
	let finalPurchaseCart = [];
	let userProducts = purchaserCart[0].products;

	for (let i = purchaserCart[0].products.length - 1; i >= 0; i--) {
		if (userProducts[i].productId.stock >= userProducts[i].quantity) {
			productsDao.updateProduct(userProducts[i].productId, {
				stock: userProducts[i].productId.stock - userProducts[i].quantity,
			});
			finalPurchaseCart.push(userProducts[i]);
			userProducts.splice(i, 1);
		}
	}

	const arrayToUpdate = userProducts.map((product) => {
		return {
			productId: product.productId,
			quantity: product.quantity,
		};
	});

	req.finalPurchaseCart = finalPurchaseCart;
	await cartDao.updateCartProductsByArray(cid, arrayToUpdate);
	next();
};
