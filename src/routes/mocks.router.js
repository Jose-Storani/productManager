import { Router } from "express";
import passport from "passport";
import { generateXProducts } from "../utils/mocks/mocksGenerator.js";
import CustomError from "../utils/errors/customError.js";
import {
    errorsCause,
    errorsName,
    errorsMessage,
    errorsCode,
} from "../utils/errors/errors.dictionary.js";
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

router.post("/mockingProducts", (req, res) => {
    res.json(generateXProducts(100));
});

router.get("/error", (req, res) => {
    CustomError.createError({
        name: errorsName.DATA_INCOMPLETE,
        cause: errorsCause.DATA_INCOMPLETE,
        message: errorsMessage.DATA_INCOMPLETE,
        code: errorsCode.DATA_INCOMPLETE,
    });
});

router.get("/error2", (req, res) => {
    CustomError.createError({
        name: "Probandin",
        cause: "Esto es una prueba",
        message: "No me hagas caso",
        code: 405,
    });
});

export default router;
