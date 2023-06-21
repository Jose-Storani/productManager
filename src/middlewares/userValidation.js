import { errors } from "../utils/errors/errors.dictionary.js";
export function userValidation(req,res,next){
    if(req.session?.userInfo){
        next();
    }
    else{
			res.status(401).render("invalid-url",{error: errors.Unauthorized})
	}
    

}

export function adminValidation(req,res,next){
    if(req.session.userInfo?.rol === "Administrador"){
        next()
    }
    else{
        res.status(403).render("invalid-url",{error:errors.Forbidden})
    }
}


