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
    isapproved: {
        type: Boolean,
        default: false, 
      },
    transationtype:{
        type:String,
        enum:['borrowed','returned']
    },
},{ timestamps: true })

export const libTransationModel = mongoose.model('librarytransation',libTransationSchema)