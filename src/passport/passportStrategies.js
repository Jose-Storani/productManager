import passport from "passport";
import { usersModel } from "../dao/models/users.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { hashPassword } from "../utilities.js";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.use("registro",new LocalStrategy({
    usernameField : "email",
    passwordField: "password",
    passReqToCallback: true
},async(req,email,password,done)=>{
    const user = await usersModel.findOne({email});
    if(user){
        return done(null,false)
    };
    const hashNewPassword = await hashPassword(password);
    const newUser = {...req.body, password:hashNewPassword};
    const newUserBD = await usersModel.create(newUser);
    done(null,newUserBD);

}))

//github strategy

passport.use("github", new GitHubStrategy({
    clientID: "Iv1.28bfb8804fcc8a8c",
    clientSecret: "d8e8699989f922f4148c03186f30b6c1ef4dbf8e",
    callbackURL: "http://localhost:8080/api/users/github"
}, (accessToken,refreshToken,profile,done) => {
    console.log(profile);
    done(null,true)
}))

passport.serializeUser((user,done)=>{
    done(null,user._id);
});

passport.deserializeUser( async(id,done)=>{
    const user = await usersModel.findById(id);
    done(null, user)
});





//Owned by: @Jose-Storani

// App ID: 305987

// Client ID: Iv1.28bfb8804fcc8a8c

//cliente secret: d8e8699989f922f4148c03186f30b6c1ef4dbf8e