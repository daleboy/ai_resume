import React from 'react'
import { Resume } from '@/models/resume'
import  PersonalDetail from "@/components/preview/personal-detail"
import { useResumeContext } from '@/context/resume'
import Summary from '@/components/preview/summary';
export default function ResumeCard() {
    const {resume} = useResumeContext();
  return (
    <div className='shadow-lg max-h-screen w-full rounded-xl p-5 border-t[20px] overflow-auto'
    style={{borderBlockColor:resume?.themeColor}}>
        <PersonalDetail resume={resume}/>
        <Summary resume={resume}/>
    </div>
  )
}
