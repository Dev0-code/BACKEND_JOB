import  express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "../Backend/routes/userRouter.js";
import jobRouter from "../Backend/routes/jobRouter.js";
import applicationRouter from "../Backend/routes/applicationRouter.js";
import {dbConnection} from "../Backend/database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({path: './config/config.env'});

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","DELETE","PUT"],
    credentials: true,
}))

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))

app.use('/api/v1/user', userRouter);
app.use('/api/v1/application', applicationRouter);
app.use('/api/v1/job', jobRouter); 

dbConnection();

app.use(errorMiddleware);

export default app;