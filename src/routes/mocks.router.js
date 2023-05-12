import { Router } from "express";
import passport from "passport";
import { generateXProducts,userGenerator } from "../utils/mocks/mocksGenerator.js";



const router = Router();

router.post(
    "/usersTest",
    async (req, res, next) => {
        const user = userGenerator();
        req.body = user;
        next();
    },
    passport.authenticate("registro", {
        failureRedirect: "/registroFailed",
        passReqToCallBack: true,
    }),
    async (req, res) => {
        res.json(req.user);
    }
);

router.post("/products", (req, res) => {
    res.json(generateXProducts(100));
});





export default router;
