import { usersModel } from "../mongoDB/models/users.model.js";
import { hashPassword, comparePasswords } from "../../utilities.js";
import CustomError from "../../utils/errors/customError.js";
import { errors } from "../../utils/errors/errors.dictionary.js";
import config from "../../config.js";
import CommonMethods from "../commonMethods.js";

export default class UserManager extends CommonMethods {
	constructor(model) {
		super(model);
	}
	async createUser(userInfo) {
		const { first_name, last_name, email, password } = userInfo;
		if (!first_name || !last_name || !email || !password) {
			CustomError.createError(errors.BadRequest);
		}
		const existUser = await usersModel.find({ email });
		if (existUser.length && password !== " ") {
			return null;
		} else {
			//si se registra con GH, asigno password un string vacío.
			if (existUser.length && userInfo.password === " ") {
				return existUser[0];
			} else {
				const hashNewPassword =
					password !== " " ? await hashPassword(password) : password;

				const newUser =
					email === config.adminAccount.adminUser
						? {
								...userInfo,
								password: await hashPassword(config.adminAccount.adminPass),
								rol: "Administrador",
						  }
						: {
								...userInfo,
								password: hashNewPassword,
						  };

				await usersModel.create(newUser);
				//Hago este return porque create no devuelve un objeto plano, y las conversiones que he tratado de realizar no funcionaron, incluso el metodo .toObject de mongoose.
				await this.updateLoginDate(email);
				return await usersModel.findOne({email}).lean();
			}
		}
	}

	async findAllUsers() {
		let users = await this.getAll();
		const ACTUAL_DATE = new Date();
		users.forEach((user) => {
			let difference = ACTUAL_DATE - user?.lastLogin;
			let hoursDifference = difference / (1000 * 60 * 60);
			if (hoursDifference > 48) user.status = "Inactivo";
			else user.status = "Activo";
		});
		return users;
	}

	async findUser(email, password) {
		const user = await usersModel.findOne({ email }).lean();
		if (!user) return null;
		if (user) {
			if (user.failedLoginAttempts >= 3) return false;

			const isPassword = await comparePasswords(password, user.password);
			if (isPassword) {
				await this.resetFailedLoginAttempts(email);
				await this.updateLoginDate(email);
				return user;
			}
			await this.incLoginAttemps(email);
			return null;
		}
	}

	async incLoginAttemps(email) {
		await usersModel.findOneAndUpdate(
			{ email },
			{ $inc: { failedLoginAttempts: 1 } }
		);
	}

	async resetFailedLoginAttempts(email) {
		await usersModel.findOneAndUpdate(
			{ email },
			{ $set: { failedLoginAttempts: 0 } }
		);
	}

	async updateLoginDate(email) {
		await usersModel.findOneAndUpdate(
			{ email },
			{ $set: { lastLogin: new Date() } }
		);
	}

	async findByEmail(email) {
		const foundUser = await usersModel.find({ email }).lean();
		return foundUser[0];
	}

	async updateUserCartID(email, updateId) {
		const response = await usersModel
			.findOneAndUpdate({ email }, { associatedCart: updateId }, { new: true })
			.lean();
		return response;
	}

	async cambiarRolUsuario(userId) {
		const usuario = await usersModel.findById(userId);
		if (!usuario) {
			return null;
		}
		usuario.rol = usuario.rol === "Administrador" ? "Usuario" : "Administrador";
		await usuario.save();
	}

	async deleteByInactivity() {
		const condition = {
			lastLogin: { $lt: new Date(Date.now() - 1 * 1 * 60 * 1000) },
			rol: "Usuario",
		};
		const usersForDelete = await usersModel.find(condition);
		await usersModel.deleteMany(condition);
		return usersForDelete;
	}
}
