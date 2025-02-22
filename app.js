import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();
const dotEnv = dotenv.config()

app.use(express.json()) //middle ware to parese json requests

// Sample Route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = process.env.PORT
const mongoDbUrl = process.env.MONGODB_URL

mongoose.connect(mongoDbUrl).then(()=>{
    app.listen(port,()=>{
        console.log('Connected to Server')
    })
}).catch((error)=>{
    console.log(error)
})
