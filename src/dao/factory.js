import config from "../config.js";
import CartManagerMongo from "./cartDao/cartManagerMDB.js";
import CartManagerFile from "./cartDao/cartManagerFile.js";
import ProductManagerMongo from "./producstDao/productManagerMDB.js";
import ProductManagerFile from "./producstDao/productManagerFile.js";
import UserManagerMongo from "./usersDao/userManagerMDB.js";
import TicketManager from "./ticketDao/ticketManagerMDB.js";
import { cartsModel } from "./mongoDB/models/cart.model.js";
import { productsModel } from "./mongoDB/models/products.model.js";
import { ticketModel } from "./mongoDB/models/ticket.model.js";



let cartDao;
let productsDao;
let usersDao;
let ticketsDao;

switch(config.persistencia){
    case "MONGO":
        await import("./mongoDB/dbConfig.js");
        cartDao = new CartManagerMongo(cartsModel);
        productsDao = new ProductManagerMongo(productsModel);
        usersDao = new UserManagerMongo();
        ticketsDao = new TicketManager(ticketModel);

        break;

    case "FILE":
        cartDao = new CartManagerFile();
        productsDao = new ProductManagerFile();
        break
    
    default:
        break
}


export {cartDao,productsDao,usersDao,ticketsDao};