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

	async findUser(email, password) {
		const correctUser = await usersModel.find({ email }).lean();
		if (correctUser.length) {
			const isPassword = await comparePasswords(
				password,
				correctUser[0].password
			);
			if (isPassword) {
				await usersModel.findOneAndUpdate(
					{
						email,
					},
					{
						$set: { failedLoginAttempts: 0 },
					}
				);
				return correctUser[0];
			} else {
				await usersModel.findOneAndUpdate(
					{
						email,
					},
					{
						$inc: { failedLoginAttempts: 1 },
					}
				);
				return null;
			}
		} else {
			return null;
		}
	}

	async findByEmail(email) {
		const foundUser = await usersModel.find({ email }).lean();
		return foundUser[0];
	}
	async updateUser(email, updateId) {
		const response = await usersModel.findOneAndUpdate(
			{ email },
			{ associatedCart: updateId },
			{ new: true }
		);
		return response;
	}
}
