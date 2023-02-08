import express from 'express'
import Hotel from '../models/Hotel.js';

const router = express.Router();

router.post('/', async (req,res)=>{
    const newHotel = Hotel(req.body)
try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
} catch (error) {
    res.send(error).status(500)
}
})


export default router