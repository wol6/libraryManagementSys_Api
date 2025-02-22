import mongoose from "mongoose";

const libTransationSchema = mongoose.Schema({
    userdetails:{
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    bookdetails:{
        type:mongoose.Types.ObjectId,
        ref:'books',
        required:true
    },
    duedate:{
        type:Date,
        required:true
    },
    transationtype:{
        type:String,
        enum:['borrowed','returned']
    },
})

export const libTransationModel = mongoose.model('librarytransation',libTransationSchema)