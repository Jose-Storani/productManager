import { Router } from "express";


import { mailController } from "../controllers/messages.controller.js";
const router = Router();

router.get("/",mailController)

export default router