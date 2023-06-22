import { productsDao } from "../dao/factory.js";

export const getAllProducts = async (req, res, next) => {
	try {
		let { limit = 10, page = 1, sort, category } = req.query;
		category ? (category = { category }) : (category = null);
		const options = {
			limit,
			page,
		};
		sort ? (options.sort = { price: sort }) : options;
		const products = await productsDao.paginateProduct(category, options);
		const status = products.docs ? "success" : "error";
		const prevLink = products.hasPrevPage
			? `/api/products?page=${products.prevPage}`
			: null;
		const nextLink = products.hasNextPage
			? `/api/products?page=${products.nextPage}`
			: null;

		res.json({
			results: {
				status,
				payload: products.docs,
				totalPages: products.totalPages,
				prevPage: products.prevPage,
				nextPage: products.nextPage,
				page: products.page,
				hasPrevPage: products.hasPrevPage,
				hasNextPage: products.hasNextPage,
				prevLink,
				nextLink,
			},
		});
	} catch (error) {
		next(error);
	}
};


export const productById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const product = await productsDao.getById(id);
		if (product) {
			res.json(product);
		} else {
			res.json({ mensage: "Producto no encontrado" });
		}
	} catch (error) {
		next(error);
	}
};

export const addOneProduct = async (req, res, next) => {
	try {
		const objProduct = req.body;
		const newProduct = await productsDao.addProduct(objProduct);

		return res
			.status(200)
			.json({ mensaje: "producto agregado con exito", newProduct });
	} catch (error) {
		next(error);
	}
};

export const modifyProduct = async (req, res, next) => {
	try {
		const { pid } = req.params;
		const update = req.body;
		const responseUpdated = await productsDao.updateProduct(pid, update);
		res.status(200).json(responseUpdated);
	} catch (error) {
		next(error);
	}
};

export const deleteOne = async (req, res, next) => {
	try {
		const { pid } = req.params;

		await productsDao.deleteById(pid);
		res.status(200).json({mensaje:"Producto eliminado con éxito"})
	} catch (error) {
		next(error);
	}
};

export const deleteAllProducts = async (req, res, next) => {
	try {
		const response = await productsDao.deleteAll();
		res.status(200).json({
			mensaje: "Productos eliminados con exito",
			cantidad: response,
		});
	} catch (error) {
		next(error);
	}
};
