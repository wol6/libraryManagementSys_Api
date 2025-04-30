import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAuthorized: {
        type: Boolean,
        default: false, 
      },
      token:{
        type:String,
        required:false
    } ,
},{ timestamps: true })

export const adminModel = mongoose.model('admins',adminSchema)