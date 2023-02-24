import { Router } from "express";
import { productos } from "../app.js";
import { productManager } from "../app.js";
import { productsModel } from "../dao/models/products.model.js";
const router = Router();




//Obtener todos los productos o el limite especificado por query
router.get("/", async (req, res) => {
    const products = await productManager.getProducts()
    const { limit } = req.query
    if (limit) {
        let productsLimit = products.slice(0, limit);
        res.json(productsLimit)
    }
    else {
        res.json(products);
    }
})


//Obtener producto unico por ID pasada por params
router.get("/:id", async (req, res) => {
    const products = await productManager.getProducts()
    const { id } = req.params;
    //si uso fileSystem, tengo que hacer parseInt al id, con MONGO, el id es un string
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product)
    }
    else {
        res.json({ mensage: "Producto no encontrado" })
    }



})


//agregar producto 
router.post("/", async (req, res) => {
    const objProduct = req.body
    const newProduct = await productManager.addProduct(objProduct);

    if (newProduct === 401) {
        res.status(400).json({ error: "Debe ingresar todos los campos requeridos" })
    }
    else if (newProduct === 402) {
        res.status(400).json({ error: "El codigo no puede ser igual a uno existente" })
    }
    else {
        res.status(200).json({ mensaje: "producto agregado con exito", newProduct });
        console.log(`Producto agregado con exito: ${newProduct}`)



    }
})

//modificar producto por ID pasada por params
router.put("/:pid", async (req, res) => {
    try {
        const {pid} = req.params        
        const update = req.body
        const responseUpdated = await productManager.updateProduct(pid,update)        
        res.json(responseUpdated)
        
    } catch (error) {
        console.log("Error: ", error)
    }

})


//borrar producto por ID pasada por params
router.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        // let productoBuscado = await productManager.getProductsById(parseInt(pid));    
        const deletedProduct = await productManager.deleteById(pid);
        res.status(200).json({"producto eliminado con exito: " : deletedProduct})
        
    } catch (error) {
        
    }
    
    

})

//borrar todos los productos
router.delete("/", async (req, res) => {
    const response = await productManager.deleteAll();
    res.status(200).json({mensaje: "Productos eliminados con exito",
cantidad: response })
})

export default router