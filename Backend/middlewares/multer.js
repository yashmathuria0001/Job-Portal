import multer from "multer";

// Set up multer memory storage
const storage = multer.memoryStorage();

// Log request to check if the middleware is being triggered
export const singleUpload = multer({ storage }).single("file");

export const middlewareLogger = (req, res, next) => {
  console.log("Middleware Triggered");
  console.log("File:", req.file);  // Log the file object
  next();
};
