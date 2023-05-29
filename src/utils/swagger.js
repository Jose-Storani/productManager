import swaggerJSDoc from "swagger-jsdoc";

import { __dirname } from "../utilities.js";

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentacion API E-commerce",
            description:"Api desarrollada a lo largo del curso Backend Coderhouse",
            version: "1.0.0"
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions);



