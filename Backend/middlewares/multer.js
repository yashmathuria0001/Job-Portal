import multer from "multer";

// Set up multer memory storage
const storage = multer.memoryStorage();

// Log request to check if the middleware is being triggered
export const singleUpload = multer({ storage }).single("file");


