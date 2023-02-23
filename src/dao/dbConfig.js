import mongoose from "mongoose";

//para conectarme a una BD desde una app, uso este metodo.

//string necesario para conectar desde atlas

const URI= "mongodb+srv://JoseStorani:Hammerfall3076@ecommercemanager.kdrfgjg.mongodb.net/ecommerce?retryWrites=true&w=majority"



//despues de la barra, hay que poner el nombre de la collecion (si existe, accede a ella, si no, la crea)

mongoose.connect(URI,(error)=>{
    if(error){
        console.log("error de conexion a la BD")
    }
    else{
        console.log("Conectado a la base de datos exitosamente")
    } 
});