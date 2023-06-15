import { Router } from "express";
import { userLogin, userLogOut } from "../controllers/users.controller.js";

const router = Router();

router.get("/", async (req, res) => {
    res.json(req.session)
})


router.get("/logout", userLogOut)



router.post("/login", userLogin);
export default router