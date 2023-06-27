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

//github strategy

passport.use(
	"github",
	new GitHubStrategy(
		{
			clientID: "Iv1.28bfb8804fcc8a8c",
			clientSecret: "d8e8699989f922f4148c03186f30b6c1ef4dbf8e",
			callbackURL: "http://localhost:8080/api/users/github",
		},
		async (accessToken, profile, done) => {
			try {
				console.log(profile.id, profile._json);
				// const ghUser = await githubUserModel.findOne({ githubId: profile.id })

				// if(ghUser){
				// 	const user = await usersDao.getById(ghUser.userID);
				// 	return(null,user)
				// }

				// const existingUser = await usersDao.findByEmail(profile._json.email);

				// if(existingUser.length !==0){
				// 	//como se usa el find, accedo al arrayElement
				// 	const newGithubUser = {
				// 		usuario: existingUser[0]._id,
				// 		githubId: profile.id,
				// 		githubToken: accessToken
				// 	};
				// 	await githubUserModel.create(newGithubUser);
				// 	return (null,existingUser[0])
				// }
				// const newUserFromGH = {
				// 	first_name: profile._json.name.split(" ")[0],
				// 	last_name: profile._json.name.split(" ")[1] || " ",
				// 	email: profile._json.email,
				// 	password: "1$#522%%",
				// };

				// const newUser = await usersDao.createUser(newUserFromGH);
				// await githubUserModel.create({
				// 	usuario: newUser._id,
				// 		githubId: profile.id,
				// 		githubToken: accessToken
				// })

				passport.use(
					"github",
					new GitHubStrategy(
						{
							clientID: "Iv1.28bfb8804fcc8a8c",
							clientSecret: "d8e8699989f922f4148c03186f30b6c1ef4dbf8e",
							callbackURL: "http://localhost:8080/api/users/github",
						},
						async (profile, done) => {
							try {
								const newUserGitHub = {
									first_name: profile._json.name.split(" ")[0],
									last_name: profile._json.name.split(" ")[1] || " ",
									email: profile._json.email,
									password: " ",
								};

								const user = await usersDao.createUser(newUserGitHub);
								!user ? done(null, user) : done(null, user);
							} catch (error) {
								return done, error;
							}
						}
					)
				);

				done(null, newUser);
			} catch (error) {
				return done, error;
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
