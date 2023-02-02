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
            const user = await userService.getByNicknameAndPassword(req.body);
        }   
        catch (e) {
            res.status(400).json(e.message);
        }
    }
}