'use client'
import React from 'react'
import {useResumeContext} from "@/context/resume"
import StepOne from "@/components/resume/step-one"
import StepTwo from "@/components/resume/step-two"
import StepThree from "@/components/resume/step-three"
import StepFour from "@/components/resume/step-four"
import StepFive from "@/components/resume/step-five"
import ResumeCreateNav from '@/components/nav/resume-create-nav'

export default function ResumeEditPage() {
  const {step} = useResumeContext();
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <ResumeCreateNav/>
      {step === 1 && <StepOne/>}
      {step === 2 && <StepTwo/>}
      {step === 3 && <StepThree/>}
      {step === 4 && <StepFour/>}
      {step === 5 && <StepFive/>}
    </div>
  )
}
