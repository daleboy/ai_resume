import mongoose from "mongoose";

export default async function db(){
    if(mongoose.connection.readyState >=1){
        return;
    }

    try{
        await mongoose.connect(String(process.env.DATABASE));
        console.log(" Connected to database");
    }catch(err){
        console.log(err);
        console.log("Failed to connect to database");
    }
}