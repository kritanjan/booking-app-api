import Hotel from "../models/Hotel.js"

// CREATE
export const createHotel = async (req, res, next) => {
    const newHotel = Hotel(req.body)
    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    } catch (error) {
        next(error)
    }
}

// UPDATE

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).send(updatedHotel)
    } catch (error) {
        next(error)
    }
}


// DELETE

export const deleteHotel =  async (req,res)=>{  
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).send('Hotel has been deleted')
    } catch (error) {
        next(error)
    }
}

// READ ONE

export const findSpecificHotel = async (req,res,next)=>{  
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).send(hotel)
    } catch (error) {
        next(error)
    }
}

// READ ALL

export const findAllHotel = async (req,res,next) =>{
    try {
        const hotel = await Hotel.find();
        res.json(hotel).status(200)        
    } catch (error) {
        next(error)
    }
}