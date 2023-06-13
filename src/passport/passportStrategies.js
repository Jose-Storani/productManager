import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { logger } from "../utils/log/logger.js";
import { usersDao } from "../dao/factory.js";

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
				const user = await usersDao.createUser(req.body);
				if (!user) {
					logger.warning("Usuario existente");
					return done(null, false);
				}
				logger.info(`usuario creado: ${user}`);
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
				const correctUser = await usersDao.findUser(email, password);
				if (correctUser) {
					logger.info(`usuario logeado: ${correctUser.email}`);
					return done(null, correctUser);
				} else {
					return done(null, false, {
						message: "Contraseña o usuario invalido",
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
		async (profile, done) => {
			try {
				const newUserGitHub = {
					first_name: profile._json.name.split(" ")[0],
					last_name: profile._json.name.split(" ")[1] || " ",
					email: profile._json.email,
					password: " ",
				};
				
				const user = await usersDao.createUser(newUserGitHub);
				!user ? done(null,user) : done(null,user)
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
