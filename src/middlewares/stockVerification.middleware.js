import { cartDao, productsDao } from "../dao/factory.js";


export const stockVerification = async (req, res, next) => {
	const { cid } = req.params;
	const purchaserCart = await cartDao.getById(cid);
	let finalPurchaseCart = [];
	purchaserCart.products.forEach((product, productIndex) => {
		if (product.productId.stock >= product.quantity) {
			productsDao.updateProduct(product.productId, {
				stock: product.productId.stock - product.quantity,
			});
			finalPurchaseCart.push(product);
			purchaserCart.products.splice(productIndex, 1);
		}
	});

	const arrayToUpdate = await purchaserCart.products.map((product) => {
		return {
			productId: product.productId,
			quantity: product.quantity,
		};
	});

	req.finalPurchaseCart = finalPurchaseCart;
	await cartDao.updateCartProductsByArray(cid, arrayToUpdate);
	next();
};
