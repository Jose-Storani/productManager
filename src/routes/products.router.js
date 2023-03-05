import { Router } from "express";
import { productManager } from "../app.js";
import { productsModel } from "../dao/models/products.model.js";
const router = Router();




//Obtener todos los productos o el limite especificado por query
router.get("/", async (req, res) => {
    let {limit=10, page=1,sort,query} =req.query;
  
    //paso por query el valor de la categoria, como hacer para que sea dinamico lo que filtre y no solo por categoria, por ej, stock o categoria
    
    query ? query = {category:query} : null
    
    const options = {
        limit,
        page,        
    }
    sort ? options.sort = {price:sort} : options

    const products = await productsModel.paginate(query,options);
    const status = products.docs ? "success" : "error";
    const prevLink = products.hasPrevPage ? `http://localhost:8080/api/products?page=${products.prevPage}` : null;
    const nextLink = products.hasNextPage ? `http://localhost:8080/api/products?page=${products.nextPage}` : null;
    
    res.json({results:{
        status,
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink,
        nextLink
    }})
})

router.get("/aggregation/:category", async(req,res) => {
    const {category} = req.params;
    const {sort = 1} = req.query;
    const productsFiltered = await productManager.aggregationFunc(category, parseInt(sort));
    res.json({productsFiltered});
})


//Obtener producto unico por ID pasada por params
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(id)
        //si uso fileSystem, tengo que hacer parseInt al id, con MONGO, el id es un string
        if (product) {
            res.json(product)
        }
        else {
            res.json({ mensage: "Producto no encontrado" })
        }
    } catch (error) {
        console.log(error)
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
        const { pid } = req.params
        const update = req.body
        const responseUpdated = await productManager.updateProduct(pid, update)
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
        res.status(200).json({ "producto eliminado con exito: ": deletedProduct })

    } catch (error) {
        console.log(error)
    }

})

//borrar todos los productos
router.delete("/", async (req, res) => {
    try {
        const response = await productManager.deleteAll();
        res.status(200).json({
            mensaje: "Productos eliminados con exito",
            cantidad: response
        })
    }
    catch (error) {
        console.log(error)
    }
}
)

export default router