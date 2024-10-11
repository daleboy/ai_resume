"use server";

import db from "@/utils/db";
import { Resume,Experience, Education, Skill } from '@/models/resume';

import {currentUser} from "@clerk/nextjs/server" 
import ResumeModel from "@/models/resume";

const checkOwnership = async(resumeId:string)=>{
    try {
        const user = await currentUser();
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        if(!userEmail){
            throw new Error("User does not exist");
        }

        //find the resume by id
        const resume = await ResumeModel.findById(resumeId) as Resume
        if(!resume){
            throw new Error("Resume not found");
        }

        //check if the resume belongs to the user
        if(resume.userEmail !== userEmail){
            throw new Error("Unauthenticated");
        }

        return true;
    } catch (error) {
        if(error instanceof Error) {
            throw Error(error.message);
        }else{
            throw Error("check ownership failed");
        }
    }
};
export const saveResumeToDB = async(data:Resume)=>{
    try{
        db();
        const user = await currentUser();
        const userEmail = user?.emailAddresses[0]?.emailAddress;
        const resume = await ResumeModel.create({...data,userEmail});
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
};

export const getResumeFromDB = async(_id:string)=>{
    try {
        db();
        const resume = await ResumeModel.findById(_id) as Resume;
        return resume;
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
};

export const updateResumeFromDB = async(data:Resume)=>{
    try {
        db();
        const {_id,...rest} =data;
        //check ownership
        await checkOwnership(_id as string);
        const resume = await ResumeModel.findByIdAndUpdate(
            _id,
            {...rest},
            {new:true}
        );

        return JSON.parse(JSON.stringify(resume));
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
}

export const updateExperienceToDB = async(_id:string,experience:Experience[])=>{
    try {
        db();
       
        //check ownership
        await checkOwnership(_id as string);

        const resume = await ResumeModel.findByIdAndUpdate(
            _id,
            {experience:experience},
            {new:true}
        );

        return JSON.parse(JSON.stringify(resume));
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
};

export const updateEducationToDB = async(_id:string,education:Education[])=>{
    try {
        db();
       
        //check ownership
        await checkOwnership(_id as string);

        const resume = await ResumeModel.findByIdAndUpdate(
            _id,
            {education:education},
            {new:true}
        );

        return JSON.parse(JSON.stringify(resume));
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
};

export const updateSkillToDB = async(_id:string,skillList:Skill[])=>{
    try {
        db();
       
        //check ownership
        await checkOwnership(_id as string);

        const resume = await ResumeModel.findByIdAndUpdate(
            _id,
            {skills:skillList},
            {new:true}
        );

        return JSON.parse(JSON.stringify(resume));
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
};

export const deleteResumeFromDB = async (_id:string) =>{
    try {
        db();
        //check ownership
        await checkOwnership(_id);

        const resume = await ResumeModel.findByIdAndDelete(_id);
        return JSON.parse(JSON.stringify(resume));
    } catch (error) {
        if(error instanceof Error){
            throw new Error(error.message);
        }else{
            throw new Error("An unkonwn error occured");
        }
    }
}