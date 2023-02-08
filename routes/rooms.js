import express from 'express'

const router = express.Router();

router.get('/',(req,res)=>{
    res.send('hello, this is rooms')
})

export default router