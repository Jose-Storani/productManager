import { Router } from "express";
import { products } from "../app.js"; 
import { sucursalCentro } from "../app.js";
const router= Router();




//Obtener todos los productos o el limite especificado por query
router.get("/", async (req,res) => {   
    const{limit} = req.query
    if(limit){
        let productsLimit = products.slice(0, limit);
        res.json(productsLimit)
    }

    else{
        res.json(products);
    }
   
})


//Obtener producto unico por ID pasada por params
router.get("/:id",(req, res) => {
    const {id} = req.params;
    const product = products.find(p => p.id === Number(id));

    if(product){
        res.json(product)
    }
    else{
        res.json("Producto no encontrado")
    }

    
    
})

//agregar producto 
router.post("/",async (req,res) => {
    let {title, description,code, price,status,stock,category,thumbnail} = req.body;
    const respuestaProductos = await sucursalCentro.addProduct(title, description,code, price,status,stock,category, thumbnail);

    if(respuestaProductos === 401){
        res.status(400).send("Debe ingresar todos los campos requeridos")
    }
        else if(respuestaProductos === 402) {
            res.status(400).send("El codigo no puede ser igual a uno existente")
        }
        else{
            res.status(200).send("producto agregado con exito")
        }
    
    
    

})

//modificar producto por ID pasada por params
router.put("/:pid",async (req,res) => {
    const {pid} = req.params
    let productoBuscado = await sucursalCentro.getProductsById(parseInt(pid));   
    if(productoBuscado === 400){
        res.status(400).send("Producto no encontrado, ID incorrecta");
    }
    else{
        
        let respuestaUpdate = await sucursalCentro.updateProduct(parseInt(pid), req.body);
        if(respuestaUpdate === 400){
            res.status(400).send("El codigo no puede ser igual a uno existente");
        }
        else{
            res.status(200).send("Producto modificado con exito")
        }
        
    }

    
})


//borrar producto por ID pasada por params
router.delete("/:pid",async (req,res) => {
    const {pid} = req.params;
    let productoBuscado = await sucursalCentro.getProductsById(parseInt(pid));
    if(productoBuscado === 400){
        res.status(400).send("Producto no encontrado, ID incorrecta");
    }
    else{
        await sucursalCentro.eliminarProducto(parseInt(pid));
        res.status(200).send("Producto eliminado con exito")
    }
    
})

//borrar todos los productos
router.delete("/", async (req,res) => {
    await sucursalCentro.eliminarProductos();
    res.status(200).send("Productos eliminados con exito")
})

export default router