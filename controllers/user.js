import User from "../models/User.js"

// CREATE
export const createUser = async (req, res, next) => {
    const newUser = User(req.body)
    try {
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        next(error)
    }
}

// UPDATE

export const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).send(updatedUser)
    } catch (error) {
        next(error)
    }
}


// DELETE

export const deleteUser =  async (req,res)=>{  
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).send('user has been deleted')
    } catch (error) {
        next(error)
    }
}

// READ ONE

export const findSpecificUser = async (req,res,next)=>{  
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        next(error)
    }
}

// READ ALL

export const findAllUser = async (req,res,next) =>{
    try {
        const user = await User.find();
        res.json(user).status(200)        
    } catch (error) {
        next(error)
    }
}