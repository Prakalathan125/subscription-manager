import { config } from "dotenv";

config({path : `.env.${process.env.NODE_ENV || 'development'}.local`})


export const {
        PORT, 
        DB_CONN, 
        JWT_SECRET,
        JWT_EXPIRES_IN,
        ARCJET_KEY
    } = process.env;
