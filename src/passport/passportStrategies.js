import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { logger } from "../utils/log/logger.js";
import { usersDao } from "../dao/factory.js";
import UserDTO from "../dto/User.dto.js"; 
import config from "../config.js";
import { githubUserModel } from "../dao/mongoDB/models/users.model.js";

import { errors } from "../utils/errors/errors.dictionary.js";


passport.use(
	"registro",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async (req, email, password, done) => {
			try {
				const newUser = await usersDao.createUser(req.body);
				
				if (!newUser) {
					logger.warning("Usuario existente");
					return done(null, false);
				}
				req.session.userInfo = newUser;
				logger.info(`usuario creado: ${newUser.email}`);
				done(null, newUser);
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
			passReqToCallback:true
		},
		async (req,email, password, done) => {
			try {
				const correctUser = await usersDao.findUser(email, password);
				if (correctUser) {
					req.session.userInfo = correctUser;
					logger.info(`usuario logeado: ${correctUser.email}`);
					return done(null, correctUser,{message:"logeado"});
				} else {
					
					if (correctUser === false) {
						logger.info(
							`La cuenta ha sido bloqueada debido a múltiples intentos fallidos.`
						);
						return done(null, false, {
							message:
								errors.Forbidden,
						});
					}
					logger.info(
						`Intento de inicio de sesión fallido para el usuario '${email}'.`
					);
					return done(null, false, {
						message: errors.Unauthorized,
					});
				}
			} catch (error) {
				return done("ERROR AL OBTENER EL USUARIO:", error);
			}
		}
	)
);





passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
	const user = await usersDao.getById(id);
	done(null, user);
});
