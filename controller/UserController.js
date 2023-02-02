const userService = require('../service/UserService')


class UserController {

    async registration(req, res) {

        try {
            const user = await userService.create(req.body);
            res.json(user);
        }
        catch (e) {

        }
    }

    async login(req, res) {
        try {
            
            const reqUser ={nickname : req.query.nickname, password: req.query.password};
            const user = await userService.getByNicknameAndPassword(reqUser);
            res.json(user);
        }   
        catch (e) {
            res.status(400).json(e.message);
        }
    }
}

module.exports = new UserController();