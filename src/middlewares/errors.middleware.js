export const errorsMiddleware = (error,req,res,next) =>{
    res.status(error.code).send({
        error:error.name,
        cause:error.cause,
        message:error.message
    })
    next()
}