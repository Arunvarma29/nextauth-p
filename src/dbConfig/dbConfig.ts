import mongoose from "mongoose";

export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('conneected', () => {
            console.log('MongoDB connected');

        })

        connection.on('error', (err) => {
            console.log('Mongodb connection error,please moake sure db id up and running' + err);
            process.exit();

        })


    } catch (error) {
        console.log("Something went wrong in connecting to DB");
        console.log(error);


    }
}