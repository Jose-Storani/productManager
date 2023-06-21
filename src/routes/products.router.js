import { Router } from "express";
import {
	getAllProducts,
	
	productById,
	addOneProduct,
	modifyProduct,
	deleteOne,
	deleteAllProducts,
} from "../controllers/products.controller.js";
import { adminValidation } from "../middlewares/userValidation.js";

const router = Router();

//Obtener todos los productos o el limite especificado por query

router.get("/", getAllProducts);


//Obtener producto unico por ID pasada por params
router.get("/:id", productById);

//agregar producto
router.post("/",adminValidation, addOneProduct);

//modificar producto por ID pasada por params
router.put("/:pid",adminValidation, modifyProduct);

//borrar producto por ID pasada por params
router.delete("/:pid", adminValidation, deleteOne);

//borrar todos los productos
router.delete("/",adminValidation, deleteAllProducts);

export default router;


