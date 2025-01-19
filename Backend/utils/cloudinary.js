import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Log the environment variables to ensure they're being loaded
console.log("Cloud Name:", process.env.CLOUD_NAME);
console.log("API Key:", process.env.API_KEY);
console.log("API Secret:", process.env.API_SECRET);

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default cloudinary;
