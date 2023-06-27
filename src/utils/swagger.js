import swaggerJSDoc from "swagger-jsdoc";

import { __dirname } from "../utilities.js";

const swaggerOptions = {
    definition:{
        openapi:"3.0.1",
        info:{
            title:"Documentacion API E-commerce",
            description:"API desarrollada a lo largo del curso Backend Coderhouse",
            version: "1.0.0",
						contact:{
							name: "Jose Storani",
							email: "jdstorani91@gmail.com",
							url: "https://www.linkedin.com/in/jose-storani/"
						}
        }
    },
    apis:[`${__dirname}/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions);



