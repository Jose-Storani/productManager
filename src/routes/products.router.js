import { Router } from "express";
import { products } from "../app.js"; 
import { sucursalCentro } from "../app.js";
const router= Router();


//Obtener todos los productos o el limite especificado por query
router.get("/", (req,res) => {   
    const{limit} = req.query
    if(limit){
        let productsLimit = products.slice(0, limit);
        res.json(productsLimit)
    }

    else{
        res.json(products);
    }
   
})


//Obtener producto unico por ID
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

router.post("/",async (req,res) => {
    let {title, description,code, price,status,stock,category,thumbnail} = req.body;
    await sucursalCentro.addProduct(title, description,code, price,status,stock,category, thumbnail);
    res.send("producto agregado con exito")
    

})

router.put("/",(req,res) => {
    
})

router.delete("/",(req,res) => {
    
})

export default router