
import express from "express"
import {  sucursalCentro } from "./productManager.js"

const app = express ()

const products = sucursalCentro.getProducts()


//Obtener todos los productos o el limite especificado por query
app.get("/products", (req,res) => {   
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
app.get("/products/:id",(req, res) => {
    const {id} = req.params;
    const product = products.find(p => p.id === Number(id));

    if(product){
        res.json(product)
    }
    else{
        res.json("Producto no encontrado")
    }

    
    
})

app.listen(5050, () => {
    console.log("Escuchando 5050");
    
})