"use server";

import db from "@/utils/db";
import { PersonInfo } from '@/models/resume';

import {currentUser} from "@clerk/nextjs/server" 
import ResumeModel from "@/models/resume";

export const saveResumeToDB = async(data:PersonInfo)=>{
    try{
        db();
        const user = await currentUser();
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        const {...rest} = data;
        const resume = await ResumeModel.create({...rest,userEmail});
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
        const resumes = await ResumeModel.find({userEmail});
        return JSON.parse(JSON.stringify(resumes));
    }catch(err){
        if(err instanceof Error){
            throw new Error(err.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
}

export const getResumeFromDB = async(_id:string)=>{
    try {
        db();
        const resume = await ResumeModel.findById(_id);
        return JSON.parse(JSON.stringify(resume));
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
}