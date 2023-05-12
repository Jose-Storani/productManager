import mongoose from "mongoose";
import config from "../../config.js";

//para conectarme a una BD desde una app, uso este metodo.

//string necesario para conectar desde atlas

const URI= config.mongoURI


mongoose.connect(URI,(error)=>{
    if(error){
        console.log("error de conexion a la BD")
    }
    else{
        console.log("Conectado a la base de datos exitosamente")
    } 
});