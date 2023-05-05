import { createNewUser, checkUser } from "../services/users.service.js";

export const createUser = async (req, res, next) => {
    try {
        const response = await createNewUser(req.body);
        res.json({ mensaje: "Usuario creado", usuario: response });
    } catch (error) {
        next(error);
    }
};

export const findUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const response = await checkUser(email, password);
        res.json({ mensaje: response });
    } catch (error) {
        next(error);
    }
};

export const profileRender = async (req, res, next) => {
    try {
        if (req.session.userInfo.rol === "Administrador") {
            res.render("products", {
                userData: req.session.userInfo,
                adminData: req.session.userInfo.rol,
            });
        } else {
            res.render("products", { userData: req.session.userInfo });
        }
    } catch (error) {
        next(error);
    }
};

export const userLogin = async (req,res,next)=>{
    try {
        req.session.userInfo = req.user;
    res.redirect("/products")
    } catch (error) {
        next(error)
    }
    
    
}

export const userLogOut = async (req,res,next)=>{
    try {
        req.session.destroy((err) => {
            if(err){
                res.send("LogOut Error");
            }
            else{
                res.status(400).redirect("/")
            }            
        })        
    } catch (error) {
        next(error)
    }    
}
