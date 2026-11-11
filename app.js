import express from 'express';
import {PORT} from './config/env.js';
import dbconnection from './db/db.connect.js';
import cookieParser from 'cookie-parser';
import errorHandler from './errorhandler/errorhandler.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import arcjetMiddleware from './errorhandler/arcjet.errorhandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());

app.use(arcjetMiddleware);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send("This is the final warning from the GOD!!")
})

app.listen(PORT,async()=>{
    await dbconnection();
    console.log(`Server is running on ${PORT}`);
});