import mongoose from "mongoose";

//cual va a ser el esquema de cada uno de los productos?
const productsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        
    },
    description:{
        type:String,
        required: true
    },
    code:{
        type:String,
        required: true,
        unique: true
    }
    ,
    price:{
        type: Number,
        required:true
    },
    status:{
        type: String,
        required: false
    }
    ,
    stock:{
        type: Number,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    thumbnail:{
        type: String,
        required: false
    }
});
//para crear un modelo de collecion necesita el nombre y el esquema (caracteristicas del documento)

export const productsModel = mongoose.model("Products",productsSchema)