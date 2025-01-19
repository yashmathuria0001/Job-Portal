import express,{urlencoded} from "express";
import cookieParser from"cookie-parser";
import cors from "cors";
import dotenv from "dotenv";//in env file we provide database username and passowrd for authetication
import connectDB from "./utils/db.js";//
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path"

import bodyParser from "body-parser";
dotenv.config({});

const _dirname=path.resolve();
const app=express();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(urlencoded({extended:true}));
app.use(cookieParser());//Parses cookies sent with incoming HTTP requests and makes them accessible through req.cookies.
const corsOptions={
    origin:'https://job-portal-v7al.onrender.com',
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

app.use(express.static(path.join(_dirname,"/Frontend/dist")))

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
})
app.listen(PORT,async()=>{
    await connectDB();
    console.log(`Server running at port ${PORT}`);
})