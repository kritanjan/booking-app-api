import User from "../models/User.js"
import { createError } from "../utils/createError.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// REGISTER

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


// LOG IN

export const logIn = async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (!user){return next(createError(404, 'User not found'))}

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password,)

        if (!isPasswordCorrect) return next(createError(400,'wrong username or password'))
        
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWTKEY)

        const {password, isAdmin, ...otherDetails} = user._doc
        
        res.status(200).cookie("access token", token,{ httpOnly: true} ).json(otherDetails)
    } catch (error) {
        next(error)
    }
}