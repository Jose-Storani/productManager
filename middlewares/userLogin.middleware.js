export const userLogin = async (req,res)=>{
    req.session.userInfo = req.user;
    console.log(req.session)
    // res.json({data: req.session.userInfo})
    // res.redirect("/products")
    res.json({logeadoPerro : req.user})
}

export const userLogOut = async (req,res)=>{
    try {
        req.session.destroy((err) => {
            if(err){
                res.send("LogOut Error");
            }
            else{
                res.status(400).json({status:true})
            }            
        })        
    } catch (error) {
        console.log(error)
    }    
}