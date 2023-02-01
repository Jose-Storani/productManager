
import express from "express"
import { ProductManager } from "./productManager.js";

//exporto la variable que contiene la clase instanciada para tener acceso a los diferentes metodos de la clase.
export let sucursalCentro = new ProductManager

//productos
export const products = await sucursalCentro.getProducts();

//carrito
export const carritos = await sucursalCentro.getCart();


//express
const app = express ()
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//rutas

import productRoute from "./routes/products.router.js"
import cartsRoute from "./routes/carts.router.js"

app.use("/api/products", productRoute);
app.use("/api/carts", cartsRoute);











app.listen(8080, () => {
    console.log("Escuchando 8080");
    
})












// const update = (req,res) => {
//     const id = req.params
//     const { nombre, precio, code, cantidad} = req.body
//     const producto = product.search(id)
//     if(!nombre) {nombre = producto.nombre}
//     if(!precio) {precio = producto.precio}
//     if(!code) {code = producto.code}
//     if(!cantidad) {cantidad = producto.cantidad}
//     const update = product.update(id, {
//         nombre: nombre,
//         precio: precio,
//         code: code
//         cantidad: cantidad
//     })
// }