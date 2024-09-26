import React from 'react'
import { Resume } from '@/models/resume'
export default function PersonalDetail({resume}:{resume:Resume}) {
  return (
    <>
    <h2 className='font-bold tex-xl text-center'>
        {resume.name}
    </h2>
    <h2 className='text-center text-sm font-medium'>{resume.job}</h2>
    <h2 className='text-center text-sm font-medium'>{resume.address}</h2>

    <div className='flex justify-between'>
        <h2 className='font-normal text-xs'>{resume.phone}</h2>
        <h2 className='font-normal text-xs'>{resume.email}</h2>
    </div>
    <hr className='border-[1.5px] my-2' style={{borderColor:resume.themeColor}}/>
 
    </>
  )
}
