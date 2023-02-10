import express from 'express'
import { createHotel, deleteHotel, updateHotel, findSpecificHotel, findAllHotel } from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();


router.post('/',verifyAdmin , createHotel)

router.put('/:id',verifyAdmin , updateHotel)

router.delete('/:id',verifyAdmin ,  deleteHotel)

router.get('/:id', findSpecificHotel)

router.get('/', findAllHotel)


export default router