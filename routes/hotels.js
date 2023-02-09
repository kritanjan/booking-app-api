import express from 'express'
import Hotel from '../models/Hotel.js';

const router = express.Router();


// CREATE ROUTE
router.post('/', async (req,res)=>{
    const newHotel = Hotel(req.body)
try {
    const savedHotel = await newHotel.save()
    res.status(200).json(savedHotel)
} catch (error) {
    res.send(error).status(500)
}
})


// UPDATE
router.put('/:id', async (req,res)=>{  
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).send(updatedHotel)
    } catch (error) {
        res.send(error).status(500)
    }
})

// DELETE ROUTE
router.delete('/:id', async (req,res)=>{  
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send('Hotel has been deleted')
    } catch (error) {
        res.send(error).status(500)
    }
})

// READ ROUTE(SPECIFIC)
router.get('/:id', async (req,res,next)=>{  
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).send(hotel)
    } catch (error) {
        next(error)
    }
})

// READ ROUTE (ALL)
router.get('/', async (req,res,next) =>{
    try {
        const hotel = await Hotel.find();
        res.json(hotel).status(200)        
    } catch (error) {
        next(error)
    }
})


export default router