import React from 'react'
import { Resume } from '@/models/resume'
import  PersonalDetail from "@/components/preview/personal-detail"
import { useResumeContext } from '@/context/resume'
export default function ResumeCard() {
    const {resume} = useResumeContext();
  return (
    <div className='shadow-lg h-[175px] w-full rounded-xl p-5 border-t[20px]'
    style={{borderBlockColor:resume?.themeColor}}>
        <ul>
            <li><PersonalDetail resume={resume}/></li>
        </ul>
    </div>
  )
}
