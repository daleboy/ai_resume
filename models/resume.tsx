import mongoose,{Schema,model} from "mongoose";
// Define the interface for the document
export interface PersonInfo {
    name: string,
    job: string,
    address: string,
    phone: string,
    email: string,
    themeColor: string,
};
export interface Experience {
    title: string;
    company: string;
    address: string;
    startDate: string;
    endDate: string;
    summary:string
}

interface Education {
    name: string;
    qualification: string;
    address: string;
    year:string;
}

interface Skill {
    name: string;
    level: string;
}

const ExperienceSchema = new Schema<Experience>({
    title:String,
    company:String,
    address:String,
    startDate:String,
    endDate:String,
    summary:String,
});

const EducationSchema = new Schema<Education>({
    name:String,
    address:String,
    qualification:String,
    year:String,
});

const SkillSchema = new Schema<Skill>({
    name:String,
    level:String,
});
export interface Resume extends PersonInfo {
    _id?: string;
    userEmail?:string;
    title?:string;
    summary?: string;
    experience?: Experience[];
    education?: Education[];
    skills?: Skill[];
}
export const ResumeSchema = new Schema<Resume>(
    {
        userEmail:{
            type: String,
            required: true,
        },
        title:String,
        name:String,
        job:String,
        email:String,
        phone:String,
        address:String,
        themeColor:String,
        summary:String,
        experience:[ExperienceSchema],
        education:[EducationSchema],
        skills:[SkillSchema],
    },
    {timestamps:true}
);


// Create the model if it doesn't already exist
const ResumeModel = mongoose.models.Resume || mongoose.model<Resume>("Resume", ResumeSchema);
export default ResumeModel;
