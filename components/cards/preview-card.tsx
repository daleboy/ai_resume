import React from 'react'
import  PersonalDetail from "@/components/preview/personal-detail"
import { useResumeContext } from '@/context/resume'
import Summary from '@/components/preview/summary';
import Experience from "@/components/preview/experience"
import Education from '@/components/preview/education';
import Skill from '@/components/preview/skill';
export default function ResumeCard() {
    const {resume} = useResumeContext();
  return (
    <div className='shadow-lg max-h-screen w-full rounded-xl p-5 border-t-[20px] overflow-auto'
    style={{borderBlockColor:resume?.themeColor}}>
        <PersonalDetail resume={resume}/>
        <Summary resume={resume}/>
        <Experience resume={resume}/>
        <Education resume={resume}/>
        <Skill resume={resume} />
    </div>
  )
}
