import mongoose from "mongoose";
const connectDb=async ()=>{
    try {
        const connectionInstance=await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDb;