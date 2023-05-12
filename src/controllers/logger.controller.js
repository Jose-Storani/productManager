import { logger } from "../utils/log/logger.js"
export const loggerController = (req,res)=>{
    logger.fatal("Error fatal")
    logger.error("error normal")
    logger.warning("advertencia")
    logger.info("informacion")
    logger.http("red Info")
    logger.debug("debugging")
    }

