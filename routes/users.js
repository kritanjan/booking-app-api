import express from 'express'
import { createUser, deleteUser, updateUser, findSpecificUser, findAllUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';


const router = express.Router();



// router.get("/authentication", verifyToken, (req,res,next)=>{
//     res.status(200).send(`Hello, You are authenticated`)
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.status(200).send(`Hello, You can delete your account`)
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.status(200).send(`Hello, You are admin and can delete any account`)
// })



router.post('/',createUser)

router.put('/:id',verifyUser, updateUser)
// password for both is alphabetagamma

router.delete('/:id',verifyUser, deleteUser)

router.get('/:id', findSpecificUser)

router.get('/',verifyAdmin, findAllUser)


export default router 