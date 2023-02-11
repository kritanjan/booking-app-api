import express from 'express'
import { createRoom, deleteRoom, findAllRoom, findSpecificRoom, updateRoom } from '../controllers/rooms.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/',findAllRoom)
router.get('/:id',findSpecificRoom)
router.put('/:id', verifyAdmin, updateRoom)
router.post('/:hotelid', verifyAdmin, createRoom)
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom)

export default router