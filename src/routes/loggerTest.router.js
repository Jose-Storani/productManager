import {Router} from "express"
import { logger } from "../utils/log/logger.js"
const router = Router()

router.get("/",(req,res)=>{
logger.fatal("Error fatal")
logger.error("error normal")
logger.warning("advertencia")
logger.info("informacion")
logger.http("red Info")
logger.debug("debugging")
})

export default router