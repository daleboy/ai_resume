import React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useResumeContext } from '@/context/resume'
import { useUser, SignInButton } from "@clerk/nextjs"
import { HexColorPicker } from 'react-colorful'


export default function StepOne() {
    const { resume, setResume, updateResume, setStep } = useResumeContext();
    const { isSignedIn } = useUser();
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true);
        e.preventDefault();
        console.log(resume);
        //update resume
        updateResume();
        setLoading(false);
        setStep(2);
    }
    //state
    const [loading, setLoading] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedResume = { ...resume, [name]: value };
        setResume(updatedResume);
        localStorage.setItem('resume', JSON.stringify(updatedResume));
        return updatedResume;
    };

    return (
        <div className='w-full p-5 shadow-lg border-t-4 rounded-lg'>
            <h2 className='text-2xl font-bold mb-5'>Personal Information</h2>
            <Input
                name="name"
                className='mb-3'
                onChange={handleChange}
                value={resume.name}
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
            <HexColorPicker color={resume.themeColor} onChange={(newColor) => (setResume({ ...resume, themeColor: newColor }))} />
            <div className='flex justify-end'>
                {!isSignedIn ? <SignInButton>Sign in to Save</SignInButton> : <Button disabled={loading} onClick={handleSubmit}>Save</Button>}
            </div>
        </div>
    )
}
