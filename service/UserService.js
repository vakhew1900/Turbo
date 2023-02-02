const { User } = require("../db");
const { Op } = require('sequelize')


class UserService {

    async registration(newUser) {

        //const user = User.create({nickname: "user", password: "password", email: "bhfjxtymrhfcbdfz@gmail.com", avatar_id : 1, status_id : 1})
        const { nickname, password, email } = newUser;
        const avatar_id = 1;
        const status_id = 1;

        if (nickname == null || email == null || password == null) {
            throw new Error("Data is empty");
        }

        const userByEmail = await this.getByEmail(email);
        const userByNickname = await this.getByNickname(nickname);

        if (userByEmail != null) {
            throw new Error("email is used another account");
        }

        if (userByNickname != null) {
            throw new Error("nickname is used another account");
        }

        const registrationUser = await User.create({ nickname: nickname, password: password, email: email, avatar_id: avatar_id, status_id: status_id });

        return registrationUser;
    }

    async getByNicknameAndPassword(user) {
        const { nickname, password } = user;

        if (nickname == null || password == null) {
            throw new NullError("name or password is empty");
        }

        const usr = await User.findOne({
            where: {
                [Op.and]: [{ nickname: nickname, password: password }]
            }
        }
        )

        if (usr == null) {
            throw new NullError("name or password is not right");
        }

        return usr;
    }

    async getByEmail(email) {

        if (email == null) {
            throw new Error("name is null");
        }

        const usr = await User.findOne({
            where: {
                email: email
            }
        }
        )

        return usr;
    }

    async getByNickname(nickname) {

        if (nickname == null) {
            throw new Error("name is null");
        }

        const usr = await User.findOne({
            where: {
                nickname: nickname
            }
        }
        )

        return usr;
    }
}

const userService = new UserService();
module.exports = userService;

// userService.getByName("user").then(res => JSON.stringify(res, null, 2));
// userService.registration(
//     {
//         nickname: "name",
//         email: "111@gmail.com",
//         password: "ppsss"
//     });
// userService.getByNicknameAndPassword({nickname: "user", password : "password"});