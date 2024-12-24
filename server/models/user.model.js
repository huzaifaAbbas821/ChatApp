import mongoose , { Schema } from "mongoose"


const userSchema = new Schema( {

fullname:{
    type:String,
    required:true
},
username:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true,
    minlength:"6"
},
} , {timestamps: true} )


export const User = mongoose.model("User" , userSchema);