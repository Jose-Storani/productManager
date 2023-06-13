
import express from "express"
import { __dirname } from "./utilities.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport"
import cookieParser from "cookie-parser";
import config from "./config.js";
import { errorsMiddleware } from "./middlewares/errors.middleware.js";
import swaggerUi from "swagger-ui-express"
import { specs } from "./utils/swagger.js";

import compression from "express-compression";

import "./passport/passportStrategies.js";


import "./dao/mongoDB/dbConfig.js"





//express 
const app = express()
app.use(compression({brotli:{enabled:true,zlib:{}}}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"))






//session store

//session store
//chequeo si existe en .env la variable de session con mongo
const mongoSessionUrl = config?.mongoSessionUrl;

const sessionOptions = {
    secret: "secretCoder",
    resave: false,
    saveUninitialized: true
}

if (mongoSessionUrl) {
    sessionOptions.store = new MongoStore({
        mongoUrl: mongoSessionUrl
    })
}

app.use(session(sessionOptions));


//passport
//inicializar passport
app.use(passport.initialize());

//passport guarda la informacion de session.
app.use(passport.session());

//handlebars

app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

const hbs = handlebars.create({
    helpers: {
        partial: function (name) {
          return name;
        }
      }
})


app.engine("handlebars", hbs.engine)


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
app.use("/api/docs", swaggerUi.serve,swaggerUi.setup(specs))


app.use((req, res) => {
    res.status(404).render('invalidUrl');
});



//SERVER + SOCKET
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al ${PORT}`);
})

// const socketServer = new Server(httpServer);

// socketServer.on("connection", async (socket) => {
//     console.log("CONECTADO");
//     let productsListServer = await productManager.listToShow();    
//     socketServer.emit("productsList", productsListServer)

//     socket.on("disconnect", () => {
//         console.log("Usuario desconectado")
//     });

//     //relacionado a productos
//     socket.on("dataForm", async (dataForm) => {
//         let productsListServer = await productManager.listToShow();       
//         productsListServer.push(dataForm);
//         socketServer.emit("productsList", productsListServer);
//     });

//     socket.on("dataDeleted", async (data) => {
//         const { id } = data;
//         let productsListServer = await productManager.listToShow(id);
//         socketServer.emit("productsListDeleted", productsListServer)
//     })

//     //RELACIONADO AL CHAT

//     //recibimos el usuario nuevo registrado para avisar a todos los conectados que se conectó

//     socket.on("newUser", (usuario) => {
//         socket.broadcast.emit("broadcast", usuario);
//     })


//     //aca recibo la informacion del mensaje, que usuario lo envió y el contenido del mensaje 
//     socket.on("messageChat", async (data) => {
//         await messagesManager.createMessages(data);
//         const messages = await messagesManager.getMessages();
//         socketServer.emit("messageLogs", messages)
//     }
//     )




// })

app.use(errorsMiddleware)








