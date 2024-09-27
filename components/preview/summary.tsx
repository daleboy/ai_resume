import { Resume } from '@/models/resume'
import React from 'react'

export default function Summary({resume}:{resume:Resume}) {
  return (
    <p className='text-xs'>{resume.summary}</p>
  )
}
