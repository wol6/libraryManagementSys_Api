import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
const app = express();
const dotEnv = dotenv.config()
import route from './routes/route.js';

app.use(cors())
app.use(express.json()) //middle ware to parese json requests
app.use('/api',route)

// Sample Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT
const mongoDbUrl = process.env.MONGODB_URL

mongoose.connect(mongoDbUrl).then(()=>{
    app.listen(port,()=>{
        console.log(`Connected to Server: ${port}`)
    })
}).catch((error)=>{
    console.log(error)
})
