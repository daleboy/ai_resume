"use client"
import React from 'react'
import { getResumeFromDB, getUserResumeFromDB, saveResumeToDB } from '@/actions/resume';
import toast from "react-hot-toast"
import {useRouter,useParams} from "next/navigation"
import { Resume } from '@/models/resume';

interface ResumeState {
    resume: Resume,
}
interface ResumesState{
    resumes:Resume[],
}
type ResumeContextValue = ResumeState &ResumesState& {
    saveResume: () => void;
    setResume:(resume:Resume)=>void;
    setStep:(step:number) => void;
    loadResume:()=>void;
    step: number;
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
    }

};

export default function ResumeProvider({ children }: { children: React.ReactNode }) {
    const [resumeState, setResumeState] = React.useState<ResumeState>(initialState);
    const [resumesState,setResumesState] = React.useState<Resume[]>([]);
    const [stepState,setStepState] = React.useState<number>(1);
    //hooks
    const router = useRouter();
    const {_id} = useParams() ;//get the id from the request url address

    const getUserResumes = async()=>{
        try {
            const data = await getUserResumeFromDB() as Resume[];
            // setResumesState((preState)=>({...preState, data}));//the resumesState data is not a list object
            setResumesState(data);//the resumesState data is a list object
        } catch (error) {
            console.error(error);
            toast.error("Failed to get resumes");
        }
    }
    
    const setStep = (step:number) => {
        setStepState(step);
    };
    const loadResume = ()=>{
        const savedResume = localStorage.getItem("resume");
        console.log(savedResume);
        if(savedResume) {
            const parsedResume = JSON.parse(savedResume); // Parse the saved resume
            setResumeState((preState)=>({...preState, ...parsedResume}));
        }
    }
    React.useEffect(() => {
        loadResume();
    },[]);
  
    React.useEffect(()=>{
        getUserResumes();
    },[]);

    React.useEffect(()=>{
        if(_id){
            console.log(_id);
            getResume();
        }
    },[_id]);

    const setResume = (resume:Resume)=>{
        setResumeState((preState)=>({...preState, resume}));
    }
    
    const saveResume = async () => {
        try {
            const data = await saveResumeToDB(resumeState.resume);
            toast.success("🎉Resume saved.Keep building");
            setResumeState((preState)=>({...preState, data}));
            // localStorage.removeItem("resume");
            router.push(`/dashboard/resume/edit/${data._id}`);
            setStepState(2);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save resume");
        }
    }
    const getResume = async()=>{
        try {
            const data = await getResumeFromDB(_id as string);
            setResume(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to get resume");
        }
    }
    React.useEffect(() => {
        console.log(resumeState); // This will log the updated state after it changes
    }, [resumeState]);

    return (
        <ResumeContext.Provider value={{ resume: resumeState.resume, step: stepState,resumes:resumesState,setResume,setStep,saveResume,loadResume}}>
            {children}
        </ResumeContext.Provider>
    );
}

export const useResumeContext = () => {
    const context = React.useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

