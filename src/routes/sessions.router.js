import { Router } from "express";
import passport from "passport"
import { userLogin, userLogOut } from "../controllers/users.controller.js";

const router = Router();

router.get("/", async (req, res) => {
    res.json(req.session)
})


router.get("/logout", userLogOut)


//login con passport

// router.post("/login",
// passport.authenticate("login",{
//     failureRedirect:"/loginError",
//     passReqToCallBack:true
// }), userLogin)

router.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            // Usuario o contraseña incorrectos
            // console.log("LLEGO ACÁ")
            return res.status(401).json({ error: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            // Autenticación exitosa
            return res.redirect("/dashboard");
        });
    })(req, res, next);
});
export default router