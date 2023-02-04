const userService = require('../service/UserService')
const jwt = require('jsonwebtoken')
const {secret} = require('../jwt/configJWT')

generateJWT = (user_id, nickname, email) => {

    const payload = {
        user_id,
        nickname,
        email
    }

    return jwt.sign(payload, secret, {expiresIn : '7h'})
}

class UserController {

    async registration(req, res) {

        try {
            const user = await userService.create(req.body);
            const token = generateJWT(user.user_id, user.nickname, user.email)
            // console.log(token);
            res.json(token);
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    }

    async login(req, res) {
        try {
            
            const reqUser ={nickname : req.query.nickname, password: req.query.password};
            const user = await userService.getByNicknameAndPassword(reqUser);
            const token = generateJWT(user.user_id, user.nickname, user.email)
            res.json(token);
        }   
        catch (e) {
            res.status(400).json(e.message);
        }
    }
}

module.exports = new UserController();