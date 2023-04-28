export async function userValidation(req,res,next){
    if(req.session.userInfo?.hasOwnProperty("email")){
        next();
    }
    else{
    return res.status(401).render("sessionExpired")
    }
    

}

export async function adminValidation(req,res,next){
    if(req.session.userInfo?.rol === "Administrador"){
        next()
    }
    else{
        res.status(401).render("invalidUrl",{adminCredentials:true})
    }
}

