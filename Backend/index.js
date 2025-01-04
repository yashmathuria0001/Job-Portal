import express from "express";
import cookieParser from"cookie-parser";
import cors from "cors";
import dotenv from "dotenv";//in env file we provide database username and passowrd for authetication
import connectDB from "./utils/db.js";//
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});


const app=express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());//Parses cookies sent with incoming HTTP requests and makes them accessible through req.cookies.
const corsOptions={
    origin:['http://localhost:5173','https://job-portal-z2n5.vercel.app/'],
    credentials:true
}
app.use(cors(corsOptions));

//middleware  



const PORT=process.env.PORT||3000;
//api
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT,async()=>{
    await connectDB();
    console.log(`Server running at port ${PORT}`);
})