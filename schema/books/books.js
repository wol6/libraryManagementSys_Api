import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    bookname:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    availabilityStatus: {
        type: Boolean,
        default: true // true = Available, false = Unavailable
    }
    
})

export const bookModel = mongoose.model('books',bookSchema)