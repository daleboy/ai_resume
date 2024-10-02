'use client'
import React from 'react'
import { useResumeContext } from "@/context/resume"
import StepOne from "@/components/resume/step-one"
import StepTwo from "@/components/resume/step-two"
import StepThree from "@/components/resume/step-three"
import StepFour from "@/components/resume/step-four"
import StepFive from "@/components/resume/step-five"
import ResumeCreateNav from '@/components/nav/resume-create-nav'
import PreviewCard from "@/components/cards/preview-card";

export default function ResumeEditPage({ params }: { params: {_id:string} }) {
  const { step,resumes,setResume } = useResumeContext();
  //state
  React.useEffect(() => {
      if (resumes && params?._id) {
          const resume = resumes.find((r) => (r._id === params._id));
          if(resume){
            setResume(resume);
          }
      }
  }, [resumes, params._id,setResume]);
  return (
    <div className='flex flex-col lg:flex-row h-screen overflow-y-auto'>
      <div className='flex flex-col lg:w-1/2 p-4 lg:order-last lg:flex lg:justify-center lg:items-center'>
        <PreviewCard />
      </div >
      <div className='flex flex-col lg:w-1/2 p-4 lg:order-first lg:flex lg:justify-center lg:items-start'>
        <ResumeCreateNav />
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        {step === 4 && <StepFour />}
        {step === 5 && <StepFive />}
      </div>
    </div>
  )
}
