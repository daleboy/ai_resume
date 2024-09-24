import React from 'react'
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import { useResume } from '@/context/resume'
import {useUser,SignInButton} from "@clerk/nextjs"
import {ResumeType} from '@/context/resume'

export default function StepOneCreate() {
    const {resume,setResume,saveResume} = useResume();
    const {isSignedIn} = useUser();
    const handleSubmit = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        console.log(resume);
        //save resume to db
        saveResume();
        //go to next step
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedResume = {...resume,[name]:value};
        setResume(updatedResume);
        localStorage.setItem('resume',JSON.stringify(updatedResume));
        return updatedResume;
    };

    return (
        <div className='w-full lg:w-1/2 p-5 shadow-lg border-t-4 rounded-lg'>
            <h2 className='text-2xl font-bold mb-5'>Personal Information</h2>
            <Input
            name="name"
            className='mb-3'
            onChange={handleChange}
            value = {resume.name}
            placeholder='Your Name'
            type='text'
            autoFocus
            required
            />
            <Input
            name="job"
            className='mb-3'
            onChange={handleChange}
            value={resume.job}
            placeholder='Job Title'
            type='text'
            autoFocus
            required
            />
            <Input
            name="address"
            onChange={handleChange}
            value={resume.address}
            placeholder='Your Address'
            type='text'
            autoFocus
            required
            className='mb-3'
            />
            <Input
            name="phone" 
            className='mb-3'
            onChange={handleChange}
            value={(resume.phone)}
            placeholder='Your Phone Number'
            type='text'
            autoFocus
            required
            />
            <Input
            name="email" 
            className='mb-3'
            onChange={handleChange}
            value={resume.email}
            placeholder='Your Email'
            type='text'
            autoFocus
            required
            />
            <div className='flex justify-end'>
                {!isSignedIn?<SignInButton>Sign in to Save</SignInButton>:<Button onClick={handleSubmit}>Save</Button>}
            </div>
        </div>
    )
}
