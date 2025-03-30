import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    bookname: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imgurl: {
        type: String
    },
    availabilityStatus: {
        type: Boolean,
        default: true // true = Available, false = Unavailable
    }

}, { timestamps: true })

export const bookModel = mongoose.model('books', bookSchema)