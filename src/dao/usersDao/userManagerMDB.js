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

				return await usersModel.create(newUser);
			}
		}
	}

	// async findUser(email, password) {
	// 	const user = await usersModel.findOne({ email }).lean();

	// 	if (!user) {

	// 		return null;
	// 	}

	// 	if (user.failedLoginAttempts >= 3) {

	// 		return false;
	// 	}

	// 	const isPasswordCorrect = await comparePasswords(password, user.password);

	// 	if (isPasswordCorrect) {

	// 		await resetFailedLoginAttempts(email);
	// 		return user;
	// 	}

	// 	await incrementFailedLoginAttempts(email);

	// 	return null;
	// }

	async findUser(email, password) {
		const user = await usersModel.findOne({ email }).lean();
		if (!user) return null;
		if (user) {
			if (user.failedLoginAttempts >= 3) return false;

			const isPassword = await comparePasswords(password, user.password);
			if (isPassword) {
				await this.resetFailedLoginAttempts(email);
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

	async findByEmail(email) {
		const foundUser = await usersModel.find({ email }).lean();
		return foundUser[0];
	}
	async updateUserCartID(email, updateId) {
		const response = await usersModel.findOneAndUpdate(
			{ email },
			{ associatedCart: updateId },
			{ new: true }
		);
		return response;
	}
}
