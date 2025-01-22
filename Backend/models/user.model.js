import mongoose from"mongoose";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    
    otp: {
        type: String, // Store OTP as a number
      },
      otpTimestamp: {
        type: Date, // Timestamp for OTP to handle expiration
        default:Date.now
      },
      isVerified: {
        type: Boolean,
        default: false, // Initially set to false. Only set to true after OTP verification
      },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String},//URL for resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    }, 
    },{timestamps:true});
    export const User=mongoose.model('User',userSchema);


