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

	static #getUsers(data, isAll, fields) {
		// 파일 시스템에서 반환되는 것은 buffer 파일이기 때문에 파싱을 해준다.
		const users = JSON.parse(data);
		if (isAll) return users;

		const newUsers = fields.reduce((newUsers, field) => {
			if (users.hasOwnProperty(field)) {
				newUsers[field] = users[field];
			}
			return newUsers;
		}, {});
		console.log(newUsers);
		return newUsers;
	}

	static getUsers(isAll, ...fields) {
		return fs
			.readFile("./src/database/users.json")
			.then((data) => {
				return this.#getUsers(data, isAll, fields);
			})
			.catch(console.log);
	}

	static getUserInfo(id) {
		return fs
			.readFile("./src/database/users.json")
			.then((data) => {
				return this.#getUserInfo(data, id);
			})
			.catch(console.log);
	}

	static async save(userInfo) {
		const users = await this.getUsers(true);

		if (users.id.includes(userInfo.id)) {
			// return new Error("이미 존재하는 아아디입니다.");
			// 라고 해주면  User.register() 메소드에서 error를 감지하지 못 한다.
			throw "이미 존재하는 아아디입니다.";
		}

		users.id.push(userInfo.id);
		users.name.push(userInfo.name);
		users.password.push(userInfo.password);
		fs.writeFile("./src/database/users.json", JSON.stringify(users));
		return { success: true };
	}

	// #은 '은닉화'한다는 의미
}

module.exports = UserStorage;
