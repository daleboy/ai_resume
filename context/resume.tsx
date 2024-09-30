"use client"
import React, { useEffect } from 'react'
import { getResumeFromDB, getUserResumeFromDB, saveResumeToDB, updateResumeFromDB, updateExperienceToDB, updateEducationToDB, updateSkillToDB } from '@/actions/resume';
import toast from "react-hot-toast"
import { useRouter, useParams, usePathname } from "next/navigation"
import { type Resume, type Experience, Education, Skill } from '@/models/resume';
import { callQwen } from "@/actions/ai-qwen"

interface ResumeState {
    resume: Resume,
};
interface ResumesState {
    resumes: Resume[],
};
interface SkillChangeEvent {
    target: {
        name: keyof Skill; 
        value: string;
    };
}

type ResumeContextValue = ResumeState & ResumesState & {
    saveResume: () => void;
    setResume: (resume: Resume) => void;
    setStep: (step: number) => void;
    loadResume: () => void;
    updateResume: () => void;
    handleExperienceSubmit: () => void;
    removeExperience: () => void;
    handleExperienceGenerateWithAi: (index:number) => void;
    addExperience: () => void;
    handleExperienceChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    setExperienceLoading: (loading: boolean[]) => void;
    handleExperienceQuillChange: (value: string, index: number)=>void;
    handleEducationSubmit: () => void;
    removeEducation: () => void;
    addEducation: () => void;
    handleEducationChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleSkillSubmit: () => void;
    removeSkill: () => void;
    addSkill: () => void;
    handleSkillChange: (e: SkillChangeEvent, index: number) => void;
    experienceList: Experience[];
    step: number;
    experienceLoading: boolean[];
    educationList:Education[];
    skillList: Skill[];
};

const ResumeContext = React.createContext<ResumeContextValue | null>(null);
const initialExperience = {
    title: '',
    company: '',
    address: '',
    startDate: '',
    endDate: '',
    summary: '',
};
const initialEducation = {
    name:'',
    address:'',
    qualification:'',
    year:'',
};
const initialSkill = {
    name:'',
    level:'',
};
const initialState: ResumeState = {
    resume: {
        name: "",
        job: "",
        address: "",
        phone: "",
        email: "",
        themeColor: "",
        experience: [initialExperience],
        education: [initialEducation],
    }
};

export default function ResumeProvider({ children }: { children: React.ReactNode }) {
    const [resumeState, setResumeState] = React.useState<ResumeState>(initialState);
    const [resumesState, setResumesState] = React.useState<Resume[]>([]);
    const [stepState, setStepState] = React.useState<number>(1);
    //Experience
    const [experienceListState, setExperienceListState] = React.useState<Experience[]>([initialExperience])
    const [experienceLoading, setExperienceLoading] = React.useState<boolean[]>([]);
    //Education
    const [educationListState,setEducationListState] = React.useState<Education[]>([]);
    //Skill
    const [skillListState,setSkillListState] = React.useState<Skill[]>([]);

    //hooks
    const router = useRouter();
    const { _id } = useParams();//get the id from the request url address
    const pathname = usePathname();

    const loadResume = () => {
        const savedResume = localStorage.getItem("resume");
        // console.log(savedResume);
        if (savedResume) {
            const parsedResume = JSON.parse(savedResume); // Parse the saved resume
            setResumeState((preState) => ({ ...preState, resume: parsedResume }));
        }
    };

    React.useEffect(() => {
        if (pathname?.includes('/resume/create')) {
            setResumeState(initialState);
            setStep(1);
        }
    }, []);

    React.useEffect(() => {
        loadResume();
    }, []);


    const getUserResumes = async () => {
        try {
            const data = await getUserResumeFromDB() as Resume[];
            // console.log(data);
            // setResumesState((preState)=>({...preState, data}));//the resumesState data is not a list object
            setResumesState(data);//the resumesState data is a list object
        } catch (error) {
            console.error(error);
            toast.error("Failed to get resumes");
        }
    };

    const setStep = (step: number) => {
        setStepState(step);
    };

    React.useEffect(() => {
        //load all the resumes from DB
        getUserResumes();
    }, []);

    React.useEffect(() => {
        if (_id) {
            // console.log(_id);
            getResume();
        }
    }, [_id]);

    const setResume = (resume: Resume) => {
        setResumeState((preState) => ({ ...preState, resume: resume }));
        // setResumesState((preState)=>([...preState, resume]));//push one resume to the ResumesState
    };

    const saveResume = async () => {
        try {
            const data = await saveResumeToDB(resumeState.resume);
            const newResume = resumeState.resume;
            setResumesState((preState) => ([...preState, newResume]));//push one resume to the ResumesState
            localStorage.removeItem("resume");
            toast.success("🎉Resume saved.Keep building");
            router.push(`/dashboard/resume/edit/${data._id}`);
            setStep(2);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save resume");
        }
    };
    const getResume = async () => {
        try {
            const data = await getResumeFromDB(_id as string);
            setResume(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to get resume");
        }
    };

    const updateResume = async () => {
        try {
            const data = await updateResumeFromDB(resumeState.resume);
            setResume(data);
            toast.success("🌈Resume updated.Keep building");
        } catch (error) {
            console.error(error);
            toast.error("❌Failed to update resume");
        }
    };

    // React.useEffect(() => {
    //     console.log(resumeState); // This will log the updated state after it changes
    // }, [resumeState]);

    //Experience section
    useEffect(() => {
        if (resumeState.resume.experience) {
            setExperienceListState(resumeState.resume.experience);
        }
    }, [resumeState]);

    const updateExperience = async () => {
        try {
            // const data = { ...resumeState.resume, experience: experienceListState };
            const resume = await updateExperienceToDB(resumeState.resume._id as string,experienceListState);
            toast.success('🌈Experience updated.Keep building');
            setResume(resume);
        } catch (error) {
            console.error(error);
            toast.error("❌Failed to update experiences");
        }
    };
    
    const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const newExperience = [...experienceListState];
        const experience = newExperience[index];
        experience[name as keyof Experience] = value;
        setExperienceListState(newExperience);
        

        // // or relpace the function to this:
        // const experience = experienceListState[index];
        // const updatedExperience = { ...experience, [name]: value };
        // const updatedExperiences = [
        //     ...experienceListState.slice(0, index), // Keep experiences before the updated one
        //     updatedExperience,                        // Include the updated experience
        //     ...experienceListState.slice(index + 1)  // Keep experiences after the updated one
        // ];
        // // Update the state
        // setExperienceListState(updatedExperiences);
    };

    const handleExperienceQuillChange = (value: string, index: number) => {
        const newExperience = [...experienceListState];
        newExperience[index].summary = value;
        setExperienceListState(newExperience);
    };

    const handleExperienceSubmit = async () => {
        await updateExperience();
        // setStep(4);
    };

    const addExperience = () => {
        const newExperience = { ...initialExperience };
        setExperienceListState([...experienceListState, newExperience]);
    };

    const removeExperience = () => {
        if (experienceListState.length === 1) {
            return;;
        }
        const experienceList = experienceListState.slice(0, experienceListState.length - 1);
        setExperienceListState(experienceList)

        // update experience list to the db
    };

    const handleExperienceGenerateWithAi = async (index:number) => {
        setExperienceLoading((prev) => {
            const newLoadingState = [...prev]; // Create a copy of the current state
            newLoadingState[index] = true; // Set the value at the specified index
            return newLoadingState; // Return the new array to update the state
        });

        const selectedExperience = experienceListState[index];
        if(!selectedExperience||!selectedExperience.title){
            toast.error('please fill the job title');
        }

        const jobTitle = selectedExperience.title;
        const jobSummary = selectedExperience.summary?.replace(/<[^>]*>/g, "");
        
        try {
            const prompt = `Generate a list of duties and responsibilities in HTML bullet points for the job title:"${jobTitle}" ${jobSummary}`;
            const response = await callQwen(prompt,'text');
            const updateExperience = [...experienceListState];
            updateExperience[index].summary = response;
            setExperienceListState(updateExperience);
            const updateResume = {...resumeState.resume,experience:updateExperience};
            setResume(updateResume);
        } catch (error) {
            console.error(error);
            toast.error('Failed to generate job summary: ');
        }finally{
            setExperienceLoading((prev) => {
                const newLoadingState = [...prev]; // Create a copy of the current state
                newLoadingState[index] = false; // Set the value at the specified index
                return newLoadingState; // Return the new array to update the state
            });
        }
    };

    //Education section
    useEffect(() => {
        if (resumeState.resume.education) {
            setEducationListState(resumeState.resume.education);
        }
    }, [resumeState]);
    const updateEducation = async () => {
        try {
            const resume = await updateEducationToDB(resumeState.resume._id as string,educationListState);
            toast.success('🌈Education updated.Keep building');
            setResume(resume);
        } catch (error) {
            console.error(error);
            toast.error("❌Failed to update education");
        }
    };
    const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const newEducation = [...educationListState];
        const education = newEducation[index];
        education[name as keyof Education] = value;
        setEducationListState(newEducation);
    };
    
    const handleEducationSubmit = async () => {
        await updateEducation();
        // setStep(5);
    };

    const addEducation = () => {
        const newEducation = { ...initialEducation };
        setEducationListState([...educationListState, newEducation]);
    };

    const removeEducation = () => {
        if (educationListState.length === 1) {
            return;;
        }
        const educationList = educationListState.slice(0, educationListState.length - 1);
        setEducationListState(educationList)

        // update experience list to the db
    };

    //skill section
    useEffect(() => {
        if (resumeState.resume.skills) {
            setSkillListState(resumeState.resume.skills);
        }
    }, [resumeState]);
    const updateSkill = async () => {
        try {
            const resume = await updateSkillToDB(resumeState.resume._id as string,skillListState);
            toast.success('Skills updated.Keep building');
            setResume(resume);
        } catch (error) {
            console.error(error);
            toast.error("❌Failed to update Skills");
        }
    };
    const handleSkillChange = (e: SkillChangeEvent, index: number) => {
        const { name, value } = e.target;
        const newSkill = [...skillListState];
        const skill = newSkill[index];
        skill[name as keyof Skill] = value;
        setSkillListState(newSkill);
    };
    
    const handleSkillSubmit = async () => {
        await updateSkill();
    };

    const addSkill = () => {
        const newSkill = { ...initialSkill };
        setSkillListState([...skillListState, newSkill]);
    };

    const removeSkill = () => {
        if (skillListState.length === 1) {
            return;;
        }
        const skillList = skillListState.slice(0, skillListState.length - 1);
        setSkillListState(skillList)

        // update experience list to the db
    };
    return (
        <ResumeContext.Provider value={{
            resume: resumeState.resume,
            step: stepState,
            resumes: resumesState,
            experienceList: experienceListState,
            experienceLoading: experienceLoading,
            educationList: educationListState,
            skillList: skillListState,
            handleExperienceChange,
            setExperienceLoading,
            setResume, setStep,
            saveResume,
            loadResume,
            updateResume,
            handleExperienceSubmit,
            addExperience,
            removeExperience,
            handleExperienceGenerateWithAi,
            handleExperienceQuillChange,
            handleEducationChange,
            addEducation,
            removeEducation,
            handleEducationSubmit,
            handleSkillChange,
            handleSkillSubmit,
            addSkill,
            removeSkill
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    const context = React.useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};

