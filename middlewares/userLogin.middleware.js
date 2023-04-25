export const userLogin = async (req,res)=>{
    req.session.userInfo = req.user;
    console.log(req.session.userInfo);
    res.redirect("/products")
    
}

export const userLogOut = async (req,res)=>{
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
        console.log(error)
    }    
}