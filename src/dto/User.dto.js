export default class UserDTO {
	static getUserData = (user) => {
		return {
			_id: user._id,
			name: `${user.first_name} ${user.last_name}`,
			email: user.email,
			rol: user.rol,
			status: user.status,
			associatedCart : user.associatedCart._id ?? user.associatedCart

		};
	};
}
