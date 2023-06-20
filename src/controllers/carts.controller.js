import { cartDao } from "../dao/factory.js";

export const getAllCarts = async (req, res, next) => {
	try {
		const carts = await cartDao.getAll();
		res.json(carts);
	} catch (error) {
		next(error);
	}
};

export const cartById = async (req, res, next) => {
	try {
		const { cid } = req.params;
		const cart = await cartDao.getById(cid);

		if (cart[0].products.length) {
			res.render("cart", { cart: cart[0] });
		} else {
			res.render("cart");
		}
	} catch (error) {
		next(error);
	}
};

export const createCart = async (req, res, next) => {
	try {
		const cartId = req.session.userInfo.associatedCart;
		res.status(200).json({
			cartId,
		});
	} catch (error) {
		next(error);
	}
};

export const addProducToCart = async (req, res, next) => {
	try {
		const { cid, pid } = req.params;
		const {quantity} = req.body;
		const respuesta = await cartDao.addToCart(cid, pid,quantity);
		res.json(respuesta);
	} catch (error) {
		next(error);
	}
};

export const addArrayToCart = async (req, res, next) => {
	try {
		const { cid } = req.params;
		const { products } = req.body;
		const productsUpdated = await cartDao.updateCartProductsByArray(
			cid,
			products
		);
		if (productsUpdated) {
			res.json(productsUpdated);
		} else {
			res.json({ mensaje: "carrito no encontrado para actualizar" });
		}
	} catch (error) {
		next(error);
	}
};

export const updateByQuery = async (req, res, next) => {
	try {
		const { quantity } = req.body;
		const { cid, pid } = req.params;
		const updatedProduct = await cartDao.updateQuantityByQuery(
			cid,
			pid,
			quantity
		);
		res.json(updatedProduct);
	} catch (error) {
		next(error);
	}
};

export const deleteAll = async (req, res, next) => {
	try {
		const response = await cartDao.deleteAll();
		res.json({ mensaje: "Carritos eliminados con exito", cantidad: response });
	} catch (error) {
		next(error);
	}
};

export const deleteCById = async (req, res, next) => {
	try {
		const { cid } = req.params;
		const deletedCart = await cartDao.deleteCartById(cid);
		res.status(200).json({ "carrito eliminado con exito: ": deletedCart });
	} catch (error) {
		next(error);
	}
};

export const deleteProductFromCart = async (req, res, next) => {
	try {
		const { cid, pid } = req.params;
		const productDeletedFromCart = await cartDao.deleteProductCart(cid, pid);
		if (productDeletedFromCart) {
			res.json({ "producto eliminado con exito": productDeletedFromCart });
		} else {
			res.json({ error: "producto no encontrado" });
		}
	} catch (error) {
		next(error);
	}
};
