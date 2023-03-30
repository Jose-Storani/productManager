import { Router } from "express";
import { generateToken } from "../utilities.js";
import { usersModel } from "../dao/models/users.model.js";
import { userManager } from "../app.js";
import { jwtValidation } from "../../middlewares/jwt.middleware.js"
import passport from "passport"
const router = Router();


//sin cookies
// router.post("/login",async(req,res)=>{
//     const {email,password} = req.body;
//     console.log(email,password)  
//     const user = await userManager.findUser(email,password);
//     if(user){
//         const token = generateToken(user);
//         res.json({token})
//     }
//     else{
//         res.json({mensaje:"error logeo"});
//     }

// })


//con cookies

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userManager.findUser(email, password);
    

    if (user) {
        const token = generateToken(user);

        //la propiedad httponly evita que el valor de la cookie pueda ser extraido desde el front
        res.cookie("token", token, { httpOnly: true });
        res.json({ message: token });
    }
    else {
        res.json({ mensaje: "error logeo" });
    }
})

router.get("/login", async (req, res) => {
    console.log(req.user)
    res.send("probando jwt")
}
);

router.get("/loginjwtpassport", passport.authenticate("jwtCookies", { session: false }), (req, res) => {
    console.log("la respuesta", req.user)
    res.redirect("/registroSuccess")
})


export default router;