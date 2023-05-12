import {
    getProducts,
    addProduct,
    aggregation,
    getProductById,
    updateProduct,
    deleteById,
    deleteAll,
    paginateProduct,
} from "../services/products.service.js";

export const getAllProducts = async (req, res, next) => {
    try {
        let { limit = 10, page = 1, sort, category } = req.query;

        category ? (category = { category }) : (category = null);

        const options = {
            limit,
            page,
        };
        sort ? (options.sort = { price: sort }) : options;

        const products = await paginateProduct(category, options);
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

export const aggregationFunction = async (req, res, next) => {
    try {
        const { category } = req.params;
        const { sort = 1 } = req.query;
        const productsFiltered = await aggregation(category, parseInt(sort));
        res.json({ productsFiltered });
    } catch (error) {
        next(error);
    }
};

export const productById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);
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
        const newProduct = await addProduct(objProduct);

        if (newProduct === 401) {
            return res
                .status(400)
                .json({ error: "Debe ingresar todos los campos requeridos" });
        }
        if (newProduct === 402) {
            return res
                .status(400)
                .json({ error: "El codigo no puede ser igual a uno existente" });
        }
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
        const responseUpdated = await updateProduct(pid, update);
        res.json(responseUpdated);
    } catch (error) {
        next(error);
    }
};

export const deleteOne = async (req, res, next) => {
    try {
        const { pid } = req.params;

        const deletedProduct = await deleteById(pid);
        res.status(200).json({ "producto eliminado con exito: ": deletedProduct });
    } catch (error) {
        next(error);
    }
};

export const deleteAllProducts = async (req, res, next) => {
    try {
        const response = await deleteAll();
        res.status(200).json({
            mensaje: "Productos eliminados con exito",
            cantidad: response,
        });
    } catch (error) {
        next(error);
    }
};
