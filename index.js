import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()


// Mongo DB connetions and controlling.
const connect = async () => {
    try {
        await mongoose.connect((process.env.MONGO))
        console.log('Connected to MongoDB')
    } catch (error) {
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('disconnected from MongoDB')
})
mongoose.connection.on('connected', () => {
    console.log('connected to MongoDB')
})



//MIDDLEWARES
app.use(cookieParser())
app.use(express.json())

app.use('/auth', authRoute)
app.use('/hotels', hotelsRoute)
app.use('/rooms', roomsRoute)
app.use('/users',usersRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMsg = err.msg || 'Something went wrong'
    return res.status(errorStatus).json({
        success: false,
        message: errorMsg,
        status: errorStatus,
        stack: err.stack
    })
})

// App Routes

app.get('/', (req, res) => {
    res.send('Hello, HomePage')
})

app.listen(8800, () => {
    connect()
    console.log('Sever started')
})