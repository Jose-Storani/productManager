import config from "../config.js";
import CartManagerMongo from "./cartDao/cartManagerMDB.js";
import CartManagerFile from "./cartDao/cartManagerFile.js";
import ProductManagerMongo from "./producstDao/productManagerMDB.js";
import ProductManagerFile from "./producstDao/productManagerFile.js";
import UserManagerMongo from "./usersDao/userManagerMDB.js";



let cartDao;
let productsDao;
let usersDao;

switch(config.persistencia){
    case "MONGO":
        await import("./mongoDB/dbConfig.js");
        cartDao = new CartManagerMongo();
        productsDao = new ProductManagerMongo();
        usersDao = new UserManagerMongo();

        break;

    case "FILE":
        cartDao = new CartManagerFile();
        productsDao = new ProductManagerFile();
        break
    
    default:
        break
}

export {cartDao,productsDao,usersDao};