import { Router } from "express";
import { transporter } from "../mensajeria/nodemailer.js";

import { mailController } from "../controllers/messages.controller.js";
const router = Router();

router.get("/",mailController)

export default router