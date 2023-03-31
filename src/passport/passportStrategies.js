
import { usersModel } from "../dao/models/users.model.js";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";

import { hashPassword } from "../utilities.js";
import { comparePasswords } from "../utilities.js";




passport.use("registro", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await usersModel.findOne({ email });
    if (user) {
        return done(null, false)
    };
    const hashNewPassword = await hashPassword(password);
    const newUser = { ...req.body, password: hashNewPassword };
    const newUserBD = await usersModel.create(newUser);
    done(null, newUserBD);

}));

passport.use("login", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const correctUser = await usersModel.findOne({ email });
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
            correctUser.rol = "Admin";
            correctUser.save();
            return done(null, correctUser);
        }
        else {
            if (correctUser) {
                const isPassword = comparePasswords(password, correctUser.password);
                if (isPassword) {


                    return done(null, correctUser)
                }
                else {
                    return done(null, false)
                }
            }

            else {
                return done(null, false)
            }
        }
    } catch (error) {
        console.log(error)
    }
}))

//github strategy

passport.use("github", new GitHubStrategy({
    clientID: "Iv1.28bfb8804fcc8a8c",
    clientSecret: "d8e8699989f922f4148c03186f30b6c1ef4dbf8e",
    callbackURL: "http://localhost:8080/api/users/github"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await usersModel.findOne({ email: profile._json.email });
        if (!user) {
            const newUser = {
                first_name: profile._json.name.split(" ")[0],
                last_name: profile._json.name.split(" ")[1] || " ",
                email: profile._json.email,
                password: " ",
            }
            const userBD = await usersModel.create(newUser);
            done(null, userBD)
        } else {
            done(null, user)
        }
    }
    catch (error) {
        return (done, error)
    }


}))

//jwt
// passport.use("jwt",new jwtStrategy({
//     secretOrKey:"secretJWT",
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// }, async(jwt_payload,done) =>{
//     // console.log(jwt_payload.user);
//     done(null,jwt_payload.user)
// })
// )


const cookieExtractor = (req) => {
    const token = req.cookies.token
    return token
}

//jwt cookies
passport.use("jwtCookies", new jwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: "secretJWT"
}, async (jwt_payload, done) => {
    done(null, jwt_payload)
}))



passport.serializeUser((user, done) => {
    
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById({ _id: id });
    done(null, user)
});





