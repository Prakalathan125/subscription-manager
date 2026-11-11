import aj from '../config/arcjet.js'

const arcjetMiddleware = async(req,res,next)=>{
    try{
        const decision = await aj.protect(req, {requested : 1});
        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                const message = new Error("Rate limit");
                message.statusCode = 401;
                throw message;
            }
            if(decision.reason.isBot()){
                const message = new Error("Bot Detected");
                message.statusCode = 401;
                throw message;
            }
        }
        next();
    }
    catch(error){
        next(error);
    }
}


export default arcjetMiddleware;