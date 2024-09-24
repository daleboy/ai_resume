"use client"
import React from 'react'
import { getUserResumeFromDB, saveResumeToDB } from '@/actions/resume';
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"
export type ResumeType = {
    name: string,
    job: string,
    address: string,
    phone: string,
    email: string,
    themeColor: string,
};
interface ResumeState {
    resume: ResumeType,
    step: number,
}
interface ResumesState{
    resumes:ResumeType[],
}
type ResumeContextValue = ResumeState &ResumesState& {
    saveResume: () => void;
    setResume:(resume:ResumeType)=>void;
    setStep:(step:number) => void;
  };
  
const ResumeContext = React.createContext<ResumeContextValue | null>(null);

const initialState: ResumeState = {
    resume: {
        name: "",
        job: "",
        address: "",
        phone: "",
        email: "",
        themeColor: "",
    },
    step: 1,

};

export default function ResumeProvider({ children }: { children: React.ReactNode }) {
    const [resumeState, setResumeState] = React.useState<ResumeState>(initialState);
    const [resumesState,setResumesState] = React.useState<ResumeType[]>([]);
    //hooks
    const router = useRouter();

    const getUserResumes = async()=>{
        try {
            const data = await getUserResumeFromDB();
            setResumesState((preState)=>({...preState, data}));
        } catch (error) {
            console.error(error);
            toast.error("Failed to get resumes");
        }
    }

    React.useEffect(() => {
        const savedResume = localStorage.getItem("resume");
        if(savedResume) {
            setResumeState((preState)=>({...preState, resume:JSON.parse(savedResume)}));
        }
    },[]);

    React.useEffect(()=>{
        getUserResumes();
    },[]);
    const setResume = (resume:ResumeType)=>{
        setResumeState((preState)=>({...preState, resume}));
    }
    const setStep = (step:number)=>{ 
        setResumeState((preState)=>({...preState, step}));
    };
    const saveResume = async () => {
        try {
            const data = await saveResumeToDB(resumeState.resume);
            toast.success("🎉Resume saved.Keep building");
            setResumeState((preState)=>({...preState, data}));
            router.push(`/dashboard/resume/edit/${data._id}`);
            setStep(2);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save resume");
        }
    }
    return (
        <ResumeContext.Provider value={{ resume: resumeState.resume, step: resumeState.step,resumes:resumesState,setResume,setStep,saveResume}}>
            {children}
        </ResumeContext.Provider>
    );
}

export const useResume = () => {
    const context = React.useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};