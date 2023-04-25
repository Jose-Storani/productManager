import { Router } from "express";
import { twilioController } from "../controllers/messages.controller.js";

const router = Router();

router.get("/",twilioController)

export default router