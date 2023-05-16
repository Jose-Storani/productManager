import { usersModel } from "../dao/mongoDB/models/users.model.js";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { createNewUser, checkUser } from "../services/users.service.js";
import { logger } from "../utils/log/logger.js";




passport.use(
    "registro",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            try {

                const user = await createNewUser(req.body);
                if (!user) {
                    logger.warning("Usuario existente")
                    return done(null, false);
                }
                logger.info(`usuario creado: ${user}`)
                done(null, user);
            } catch (error) {
                return done("ERROR AL OBTENER EL USUARIO:", error);
            }
        }
    )
);

passport.use(
    "login",
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",

        },
        async (email, password, done) => {
            try {

                const correctUser = await checkUser(email, password)
                if (correctUser) {
                    logger.info(`usuario logeado: ${correctUser.email}`)
                    return done(null, correctUser);
                }
                else {

                    return done(null, false, { message: "Contraseña o usuario invalido" })
                }

            } catch (error) {
                return done("ERROR AL OBTENER EL USUARIO:", error);
            }
        }
    )
);

//github strategy

passport.use(
    "github",
    new GitHubStrategy(
        {
            clientID: "Iv1.28bfb8804fcc8a8c",
            clientSecret: "d8e8699989f922f4148c03186f30b6c1ef4dbf8e",
            callbackURL: "http://localhost:8080/api/users/github",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile._json)
                const newUserGitHub = {
                    first_name: profile._json.name.split(" ")[0],
                    last_name: profile._json.name.split(" ")[1] || " ",
                    email: profile._json.email,
                    password: " ",
                };

                //llamo directamente al servicio, no al controlador
                const user = await createNewUser(newUserGitHub);

                if (!user) {
                    console.log("primeraInstancia: ", user)
                    done(null, user);
                } else {
                    console.log("segunda instancia")
                    done(null, user);
                }
            } catch (error) {
                console.log("tiró error")
                return done, error;
            }
        }
    )
);

//jwt
// passport.use("jwt",new jwtStrategy({
//     secretOrKey:"secretJWT",
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// }, async(jwt_payload,done) =>{
//     // console.log(jwt_payload.user);
//     done(null,jwt_payload.user)
// })
// )

// const cookieExtractor = (req) => {
//     const token = req.cookies.token
//     return token
// }

// //jwt cookies
// passport.use("jwtCookies", new jwtStrategy({
//     jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//     secretOrKey: "secretJWT"
// }, async (jwt_payload, done) => {
//     done(null, jwt_payload)
// }))

passport.serializeUser((user, done) => {
    console.log("Serializando", user._id)
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    const user = await usersModel.findById({ _id: id });
    done(null, user);
});
