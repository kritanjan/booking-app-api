import express from 'express'
import { createHotel, deleteHotel, updateHotel, findSpecificHotel, findAllHotel } from '../controllers/hotel.js';


const router = express.Router();


router.post('/',createHotel)

router.put('/:id',updateHotel)

router.delete('/:id', deleteHotel)

router.get('/:id', findSpecificHotel)

router.get('/', findAllHotel)


export default router