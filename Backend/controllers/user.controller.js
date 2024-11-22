import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
        /*Destructuring User Data from Request Body:
fullname, email, phoneNumber, password, and role are retrieved from req.body.*/
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
     

       /* If any field is missing, it returns a 400 Bad Request response with a failure message.*/


        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        /*The uploaded file (likely a profile photo) is passed through the getDataUri utility to convert it into a data URI.
This data URI is then uploaded to Cloudinary, and the response includes the file’s secure URL.*/



        // const file = req.file;
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);


        /*The code checks whether a user with the same email exists in the database to prevent duplicates.*/



        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }

        /*The password is hashed with bcrypt for security before saving.*/

        const hashedPassword = await bcrypt.hash(password, 10);


        /*The new user data, along with the Cloudinary profile photo URL, is stored in the database.*/

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            // profile:{
            //     profilePhoto:cloudResponse.secure_url,
            // }
        });


        /*On success, it returns a 201 Created response. If an error occurs, it logs the error.*/

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res) => {
    try {
        // Extracting user data from body
        const { email, password, role } = req.body;
        
        /*If any of these fields are missing, a 400 Bad Request response is returned, notifying the client that something is missing.*/



        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        /*It searches for a user by email in the database.*/

        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }


        /*The password entered by the user is compared with the hashed password in the database using bcrypt.*/


        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };


        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        /*A JWT (JSON Web Token) is generated with the user’s ID as payload, signed using the SECRET_KEY from environment variables.
The token is valid for 1 day (1d).*/




        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });


        /*After login, only essential user information is structured into a new object, excluding the password for security reasons.*/

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        /*
        1.HTTP-only cookies are a secure way to store JWT tokens since they cannot be accessed by JavaScript, mitigating XSS attacks.

        2.The sameSite: 'strict' setting prevents CSRF attacks by ensuring the token is only sent with requests from the same site.

        3.1-day expiration helps limit the duration of token validity, improving security.

        4.By setting the JWT in a cookie, the frontend doesn’t need to manage the token manually, and the browser will automatically send the cookie with every request to the backend.*/


        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

/*This line clears the JWT token stored in the cookie by:

Setting the cookie value to an empty string ("").
Setting maxAge: 0, which makes the cookie expire immediately.
Effect:

Once this cookie is expired, the browser will no longer send it with future requests, meaning the user is effectively logged out.*/


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}





export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar

       /* 
       1.getDataUri(file) converts the uploaded file into a data URI (a format required by Cloudinary for uploads).
       
       2.cloudinary.uploader.upload() uploads the resume to Cloudinary, and the secure_url is returned in the response.*/

        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        /*skills.split(","): Converts the skills string (comma-separated) into an array of skills.*/

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        // if(cloudResponse){
        //     user.profile.resume = cloudResponse.secure_url // save the cloudinary url
        //     user.profile.resumeOriginalName = file.originalname // Save the original file name
        // }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}