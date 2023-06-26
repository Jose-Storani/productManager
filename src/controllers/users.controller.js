import { usersDao } from "../dao/factory.js";
import passport from "passport";
import { transporter } from "../mensajeria/nodemailer.js";
import UserDTO from "../dto/User.dto.js";


export const createUser = async (req, res, next) => {
	try {
		const response = await usersDao.createUser(req.body);
		res.status(200).json({ mensaje: "Usuario creado", usuario: response });
	} catch (error) {
		next(error);
	}
};

export const findUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const response = await usersDao.findUser(email, password);
		const userData = UserDTO.getUserData(response);


		res.json({ mensaje: userData });
	} catch (error) {
		next(error);
	}
};

export const profileRender = (req, res, next) => {
	try {
		const userData = UserDTO.getUserData(req.session.userInfo);
		console.log(userData);
		if (req.session.userInfo.rol === "Administrador") {
			res.render("products", {
				userData,
				adminData: req.session.userInfo.rol,
			});
		} else {
			res.render("products", { userData});
		}
	} catch (error) {
		next(error);
	}
};

export const userLogin = (req, res, next) => {
	passport.authenticate("login", (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json(info.message);
		}
		req.session.userInfo = user;
		return res.status(200).json(info.message);
	})(req, res, next);
};

export const userLogOut = async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				res.send("LogOut Error");
			} else {
				res.clearCookie("sessionID");
				res.status(400).redirect("/");
			}
		});
	} catch (error) {
		next(error);
	}
};

export const deleteUser = async (req, res, next) => {
	try {
		const { USER_ID } = req.body;
		const response = await usersDao.deleteById(USER_ID);
		//devuelve el usuario eliminado
		const deletedUser = UserDTO.getUserData(response);
		res.status(200).json(deletedUser);
	} catch (error) {
		next(error);
	}
};

export const deleteAllUsers = async (req, res, next) => {
	try {
		const deleted = await usersDao.deleteAll();
		res.status(200).json({ deleted: deleted });
	} catch (error) {
		next(error);
	}
};

export const getAllUsersRol = async (req, res) => {
	const users = await usersDao.findAllUsers();
	const usersData = users.map((user)=>{
		return UserDTO.getUserData(user)
	});
	res.render("change-rol", { users: usersData, adminData: true });
};

export const changeUserRol = async (req, res, next) => {
	try {
		const { id } = req.body;
		await usersDao.cambiarRolUsuario(id);
		res.status(200).json({ data: "Rol cambiado con exito" });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const deleteInactiveUsers = async (req, res, next) => {
	const deletedUsers = await usersDao.deleteByInactivity();

	if(deletedUsers.length){
		const usersEmails = deletedUsers.map((user) => user.email);

		await transporter.sendMail({
			from: "Administración Omega Electrónica",
			to: usersEmails,
			subject: "Cuenta eliminada",
			text: "Estimado usuario, su cuenta a sido eliminada por inactividad, por favor, contactese con un administrador para volver a activarla",
		});
		res.status(200).json({ deletedUsersMails: usersEmails });
	}

	res.status(400).json({deletedUser:"No hay usuarios inactivos para eliminar"})
	

	
};
