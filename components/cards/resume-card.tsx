import React from 'react'
import { Resume } from '@/models/resume'
import  PersonalDetail from "@/components/preview/personal-detail"
import  Link from "next/link"
import Summary from '@/components/preview/summary'

export default function ResumeCard({resume}:{resume:Resume}) {
  return (
    <Link href={`/dashboard/resume/edit/${resume._id}`}>
    <div className='shadow-lg h-[175px] w-full rounded-xl p-5 border-t[20px]'
    style={{borderBlockColor:resume?.themeColor}}>
        <PersonalDetail resume={resume}/>
        <Summary resume={resume}/>
    </div>
    </Link>
  )
}
