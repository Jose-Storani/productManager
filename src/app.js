
import express from "express"
import { __dirname } from "./utilities.js";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport"

import "./passport/passportStrategies.js";


import "./dao/dbConfig.js"


//CON FILE SYSTEM:
// import { ProductManager } from "./dao/fileManager/productManager.js";
// import { CartManager } from "./dao/fileManager/cartManager.js";

//CON MONGO DB
import { CartManager } from "./dao/mongoManager/cartManagerMDB.js";
import { ProductManager } from "./dao/mongoManager/productManagerMDB.js";
import { MessagesManager } from "./dao/mongoManager/messagesManager.js";
import { UserManager } from "./dao/mongoManager/userManagerMDB.js";

//exporto la variable que contiene la clase instanciada para tener acceso a los diferentes metodos de la clase.

export let productManager = new ProductManager;
export let cartManager = new CartManager;
export let messagesManager = new MessagesManager
export let userManager = new UserManager



//express
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"))

//session store

app.use(session({
    secret:"secretCoder",
    resave:false,
    saveUninitialized:true,
    // cookie:{maxAge:10000},
   //la propiedad cookie, nos permite darle customizacion a las cookies, como maxage 
    store:new MongoStore({
        mongoUrl: "mongodb+srv://JoseStorani:Hammerfall3076@ecommercemanager.kdrfgjg.mongodb.net/sessionProductManager?retryWrites=true&w=majority",

        //tiempo de sesion activa : 2 minutos, no funciona... probé con 10 segundos, tampoco.
    ttl:120000
        
    })
}))
//passport
//inicializar passport
app.use(passport.initialize());

//passport guarda la informacion de session.
app.use(passport.session());

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")






//rutas
import productRoute from "./routes/products.router.js"
import cartsRoute from "./routes/carts.router.js"
import viewsRoute from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import usersRouter from "./routes/users.router.js"


app.use("/api/products", productRoute);
app.use("/api/carts", cartsRoute);
app.use("/", viewsRoute);
app.use("/api/sessions", sessionsRouter);
app.use("/api/users", usersRouter);



//SERVER + SOCKET
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al ${PORT}`);
})

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    console.log("CONECTADO");
    let productsListServer = await productManager.listToShow();    
    socketServer.emit("productsList", productsListServer)

    socket.on("disconnect", () => {
        console.log("Usuario desconectado")
    });

    //relacionado a productos
    socket.on("dataForm", async (dataForm) => {
        let productsListServer = await productManager.listToShow();       
        productsListServer.push(dataForm);
        socketServer.emit("productsList", productsListServer);
    });

    socket.on("dataDeleted", async (data) => {
        const { id } = data;
        let productsListServer = await productManager.listToShow(id);
        socketServer.emit("productsListDeleted", productsListServer)
    })

    //RELACIONADO AL CHAT

    //recibimos el usuario nuevo registrado para avisar a todos los conectados que se conectó

    socket.on("newUser", (usuario) => {
        socket.broadcast.emit("broadcast", usuario);
    })


    //aca recibo la informacion del mensaje, que usuario lo envió y el contenido del mensaje 
    socket.on("messageChat", async (data) => {
        await messagesManager.createMessages(data);
        const messages = await messagesManager.getMessages();
        socketServer.emit("messageLogs", messages)
    }
    )




})










