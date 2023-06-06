import mongoose from "mongoose";
import config from "../../config.js";

const URI= config.mongoURI


mongoose.connect(URI,(error)=>{
    if(error){
        console.log("error de conexion a la BD")
    }
    else{
        console.log("Conectado a la base de datos exitosamente")
    } 
});