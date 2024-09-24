"use server";

import db from "@/utils/db";
import {type ResumeType} from "@/context/resume"
import Resume from "@/models/resume"

import {currentUser} from "@clerk/nextjs/server" 

export const saveResumeToDB = async(data:ResumeType)=>{
    try{
        db();
        const user = await currentUser();
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        const {...rest} = data;
        const resume = await Resume.create({...rest,userEmail});
        return JSON.parse(JSON.stringify(resume));
    }catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    } 
};

export const getUserResumeFromDB  = async()=>{
    try{
        db();
        const user =await currentUser();
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        const resumes = await Resume.find({userEmail});
        return JSON.parse(JSON.stringify(resumes));
    }catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
}