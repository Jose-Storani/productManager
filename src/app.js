
import express from "express"
import { ProductManager } from "./productManager.js";
import { __dirname } from "./utilities.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";

//exporto la variable que contiene la clase instanciada para tener acceso a los diferentes metodos de la clase.
export let sucursalCentro = new ProductManager

//productos
export const products = await sucursalCentro.getProducts();

//carritos
export const carritos = await sucursalCentro.getCart();


//express
const app = express ()
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"))

//handlebars
app.engine("handlebars", handlebars.engine()) 
app.set("views", __dirname + "/views") 
app.set("view engine", "handlebars") 

//rutas

import productRoute from "./routes/products.router.js"
import cartsRoute from "./routes/carts.router.js"
import viewsRoute from "./routes/views.router.js"


app.use("/api/products", productRoute);
app.use("/api/carts", cartsRoute);
app.use("/", viewsRoute)


//alojamiento de dataProducts
// let productsListServer = [];

//SERVER + SOCKET
const httpServer = app.listen(8080, () => {
    console.log("Escuchando 8080");
    
})

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket)=>{
    console.log("CONECTADO");

    socket.on("disconnect",()=> {
        console.log("Usuario desconectado")
    });

    socket.on("dataForm",async (dataForm)=>{
        let productsListServer = await sucursalCentro.listToShow();
        
        //log para ver si lo enviado desde el cliente llega correctamente
        console.log(dataForm)

        productsListServer.push(dataForm);
        socketServer.emit("productsList", productsListServer);
    })

    



})










