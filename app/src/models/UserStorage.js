"use strict";

const fs = require("fs").promises;

class UserStorage {
	// 항상 private로 선언된 변수나 메서드는 class 최상단에 두는 습관을 들이자
	static #getUserInfo(data, id) {
		const users = JSON.parse(data);
		const idx = users.id.indexOf(id);
		const usersKeys = Object.keys(users); // => [id, password, name]
		const userInfo = usersKeys.reduce((newUser, info) => {
			newUser[info] = users[info][idx];
			return newUser;
		}, {});

		return userInfo;
	}

	static getUsers(...fields) {
		// const users = this.#users;
		const newUsers = fields.reduce((newUsers, field) => {
			if (users.hasOwnProperty(field)) {
				newUsers[field] = users[field];
			}
			return newUsers;
		}, {});
		console.log(newUsers);
		return newUsers;
	}

	static getUserInfo(id) {
		return fs
			.readFile("./src/database/users.json")
			.then((data) => {
				return this.#getUserInfo(data, id);
			})
			.catch(console.log);
	}

	static save(userInfo) {
		// const users = this.#users;
		users.id.push(userInfo.id);
		users.name.push(userInfo.name);
		users.password.push(userInfo.password);
		return { success: true };
	}

	// #은 '은닉화'한다는 의미
}

module.exports = UserStorage;
