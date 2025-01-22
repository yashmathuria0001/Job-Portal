import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({});
//function to send OTP email
const sendOtpEmail=(email,otp)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MY_EMAIL,
            pass:process.env.MY_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.MY_EMAIL,
    to: email,
    subject: "OTP for Signup",
    html: `<p>Dear User,</p>
           <p>Your OTP for signup is: <strong>${otp}</strong></p>
           <p>This OTP is valid for 5 minutes.</p>
           <p>Thank you!</p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending OTP email:', error);
        } else {
          console.log('OTP sent: ' + info.response);
        }
      });
    
};
export default sendOtpEmail


