export async function userValidation(req,res,next){
    if(req.session.hasOwnProperty("email")){
        
        next();
    }
    else{
    return res.status(401).render("sessionExpired")
    }
    

}

