import { createError } from "./createError.js"
import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) =>{
    const token = req.cookies['access token'];
    if (!token){
        return next(createError(401, "you are not aunthenticated"))
    }

    jwt.verify(token, process.env.JWTKEY, (error,user)=>{
        if(error){
            return next(createError(403, "Token is invalid"))
        }
        req.user = user
        next()
    })
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res, next,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        } else {
            return next(createError(403, 'You are not authorized'))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res, next,()=>{
        if(req.user.isAdmin){
            next()
        } else {
            return next(createError(403, 'You are not authorized'))
        }
    })
}