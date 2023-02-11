import Room from "../models/Room.js";
import Hotel from '../models/Hotel.js'
import { createError } from "../utils/createError.js";


// CREATE

export const createRoom = async (req,res,next)=>{

    const hotelId = req.params.hotelid
    const newRoom = new Room(req.body)

    try {
        const savedRoom = await newRoom.save()
        await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id},})
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}


// UPDATE

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}


// DELETE


export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    try {
      await Room.findByIdAndDelete(req.params.id);
      try {
        await Hotel.findByIdAndUpdate(hotelId, {
          $pull: { rooms: req.params.id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json("Room has been deleted.");
    } catch (err) {
      next(err);
    }
  };

// READ ONE

export const findSpecificRoom = async (req,res,next)=>{  
    try {
        const room = await Room.findById(req.params.id)
        res.status(200).json(room)
    } catch (error) {
        next(error)
    }
}

// READ ALL

export const findAllRoom = async (req,res,next) =>{
    try {
        const room = await Room.find();
        res.json(room).status(200)        
    } catch (error) {
        next(error)
    }
}