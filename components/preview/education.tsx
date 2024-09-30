import { Resume } from '@/models/resume'
import React from 'react'


export default function Education({ resume }: { resume: Resume }) {
    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2' style={{ color: resume.themeColor }}>
                Education
            </h2>
            <hr style={{borderColor:resume.themeColor}}/>

            {resume?.education?.map((edu,index)=>{
                return (
                    <div className='my-5' key={index}>
                        <h3 className='text-sm font-bold'>{edu?.qualification}</h3>
                        <div className='ml-2'>
                        <p className='text-sm'>{edu?.name}</p>
                        <p className='text-xs text-gray-600'>{edu?.year}</p>
                        <p className='text-xs text-gray-600'>{edu?.address}</p>
                    </div>
                    </div>
                );
            })}
        </div>
    )
}
