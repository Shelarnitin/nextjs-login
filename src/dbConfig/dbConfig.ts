import mongoose from "mongoose";

export async function connect() {
    try {
        if(mongoose.connection.readyState >= 1){
            console.log("MongoDB already connected");
            return;
        }
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
        })

        connection.on("error", (err) => {
            console.error("MongoDB connection error. Please make sure MongoDB is running. " + err);
            process.exit(1);
        })
    } catch (error) {
        console.error("something gone wrong");
        console.log(error)
        throw new Error("database connection failed");
        
    }
}