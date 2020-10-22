const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URI , {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(`MongoDB connected`.cyan.underline)
    } catch(error){
        console.error(`Error : ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

module.exports= connectDB;

//this function is going to be asynchronous bcoz when we deal with mongodb ,when we call like .connect or 
//find or create ,its always going to return a promise