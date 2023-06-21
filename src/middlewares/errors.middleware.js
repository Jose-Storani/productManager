import { logger } from "../utils/log/logger.js"
export const errorsMiddleware = (error,req,res,next) =>{
    // res.status(error.code).send({
    //     error:error.name,
    //     cause:error.cause,
    //     message:error.message
    // })

    logger.error(`${error.name} ${error.code}`)
    res.status(error.code).render("invalid-url",{error}
    )
}