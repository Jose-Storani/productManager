import { errors } from "../utils/errors/errors.dictionary.js"
import { logger } from "../utils/log/logger.js"
errors
export const errorsMiddleware = (error,req,res,next) =>{
		logger.error(`${error.cause} ${error.code}`)
		if(!error.hasOwnProperty("name")) error = errors.InternalServerError
    
    res.status(error.code).render("invalid-url",{error}
    )
}