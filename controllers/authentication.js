import User from "../models/User.js"
import bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
    try {
        const saltRounds = 10;
        const hash = bcrypt.hashSync(req.body.password, saltRounds);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        await newUser.save()
        res.status(200).json(newUser)

    } catch (error) {
        next(error)
    }
}