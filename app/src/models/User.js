"use strict";

const UserStorage = require("./UserStorage");

class User {
	constructor(body) {
		this.body = body;
	}

	async login() {
		const client = this.body;
		const { id, password } = await UserStorage.getUserInfo(client.id);
		if (id) {
			if (id === client.id && password === client.password) {
				return { success: true };
			}
			return { success: false, msg: "비밀번호가 틀렸습니다." };
		}
		return { succes: false, msg: "존재하지 않는 아이디입니다." };
	}

	async register() {
		try {
			const client = this.body;
			const response = await UserStorage.save(client);
			return response;
		} catch (error) {
			return { success: false, msg: error };
		}
	}
}

module.exports = User;
