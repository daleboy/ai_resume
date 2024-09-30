import React from 'react'
import { Resume } from '@/models/resume'
import PersonalDetail from "@/components/preview/personal-detail"
import Link from "next/link"
import Summary from '@/components/preview/summary'
import Experience from '../preview/experience'
import Education from '../preview/education'
import Skill from '../preview/skill'

export default function ResumeCard({ resume }: { resume: Resume }) {
  return (
    <Link href={`/dashboard/resume/edit/${resume._id}`}>
      <div className='shadow-lg  w-full rounded-xl p-5 border-t[20px] max-h-screen overflow-auto'
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
          <Skill resume={resume} />
        </div>
      </div>
    </Link>
  )
}
