'use client';
import React from 'react'
import { Resume } from '@/models/resume'
import PersonalDetail from "@/components/preview/personal-detail"
import Summary from '@/components/preview/summary'
import Experience from '@/components/preview/experience'
import Education from '@/components/preview/education'
import Skill from '@/components/preview/skill'
import { Button } from '@/components/ui/button'
import {UserPen,Download,Trash} from 'lucide-react'
import {useRouter} from 'next/navigation'
import { useResumeContext } from '@/context/resume'
import { type SkillProps } from '@/models/resume'
export default function ResumeCard({ resume }: { resume: Resume }) {
  const router = useRouter();
  const {removeResume} = useResumeContext();
  const skillProps:SkillProps = {
    resume:resume,
  }
  return (
      <div className=' relative shadow-lg  w-full rounded-xl p-5 border-t-[20px] max-h-screen overflow-auto'
        style={{ borderBlockColor: resume?.themeColor }}>
        <div className='line-clamp-3'>
          <PersonalDetail resume={resume} />
        </div>
        <div className='line-clamp-4'>
          <Summary resume={resume} />
        </div>
        <div className='line-clamp-4'>
          <Experience resume={resume} />
        </div>
        <div className='line-clamp-4'>
          <Education resume={resume} />
        </div>
        <div className='line-clamp-4'>
          <Skill props={skillProps} />
        </div>

        <div className='absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300'>
          <div className='flex space-x-4'>
            <Button onClick={()=>(router.push(`/dashboard/resume/edit/${resume._id}`))}><UserPen/></Button>
            <Button onClick={()=>(router.push(`/dashboard/resume/download/${resume._id}`))}><Download/></Button>
            <Button onClick={()=>(removeResume(resume._id as string))}><Trash/></Button>
          </div>
        </div>
      </div>
  )
}
