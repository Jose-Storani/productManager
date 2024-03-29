
import express from "express"
import { __dirname } from "./utilities.js"
import handlebars from "express-handlebars"
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport"
import cookieParser from "cookie-parser";
import config from "./config.js";
import { errorsMiddleware } from "./middlewares/errors.middleware.js";
import swaggerUi from "swagger-ui-express"
import { specs } from "./utils/swagger.js";
import compression from "express-compression";
import CustomError from "./utils/errors/customError.js";
import { errors } from "./utils/errors/errors.dictionary.js";
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
    saveUninitialized: false,
		name: "sessionID",
		cookie:{
			maxAge: 3*60*10000
		}
}



if (mongoSessionUrl) {
    sessionOptions.store = new MongoStore({
        mongoUrl: mongoSessionUrl,
				ttl: 2 * 24 * 60 * 60
    })
}

app.use(session(sessionOptions));


//passport
//inicializar passport
app.use(passport.initialize());

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





//middleware de autenticación para todas las rutas, excepto login y registro

app.use("/", viewsRoute);
app.use("/api/sessions", sessionsRouter);
app.use("/api/products", productRoute);
app.use("/api/carts", cartsRoute);
app.use("/api/users", usersRouter);
app.use("/api/docs", swaggerUi.serve,swaggerUi.setup(specs))


app.use((req, res) => {
	CustomError.createError(errors.NotFound)
    // res.status(404).render('invalid-url');
});



//SERVER + SOCKET
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al ${PORT}`);
})


app.use(errorsMiddleware)







