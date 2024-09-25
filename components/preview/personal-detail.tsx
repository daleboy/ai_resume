import React from 'react'
import { Resume } from '@/models/resume'
export default function PersonalDetail({personInfo}:{personInfo:Resume}) {
  return (
    <>
    <h2 className='font-bold tex-xl text-center'>
        {personInfo.name}
    </h2>
    <h2 className='text-center text-sm font-medium'>{personInfo.job}</h2>
    <h2 className='text-center text-sm font-medium'>{personInfo.address}</h2>

    <div className='flex justify-between'>
        <h2 className='font-normal text-xs'>{personInfo.phone}</h2>
        <h2 className='font-normal text-xs'>{personInfo.email}</h2>
    </div>
    <hr className='border-[1.5px] my-2' style={{borderColor:personInfo.themeColor}}/>
 
    </>
  )
}
