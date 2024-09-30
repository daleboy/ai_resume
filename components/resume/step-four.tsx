import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ArrowRight, Plus, X} from "lucide-react"
import { useResumeContext } from '@/context/resume';

export default function StepFour() {
  const {
    educationList,
    handleEducationSubmit,
    addEducation,
    removeEducation,
    handleEducationChange,
  } = useResumeContext();

  return (
    <div className='w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto'>
      <h2 className='text-2xl font-bold mb-5'>Education</h2>
      {educationList?.length > 0 &&
        educationList?.map((education, index) => (
          <div className='mb-10' key={index}>
            <Input
              name='name'
              type='text'
              value={education.name}
              className='mb-3'
              onChange={(e) => { handleEducationChange(e, index) }}
              placeholder='University name'
              autoFocus 
              />

            <Input
              name='qualification'
              type='text'
              value={education.qualification}
              className='mb-3'
              onChange={(e) => { handleEducationChange(e, index) }}
              placeholder='Qualification' />

            <Input
              name='address'
              type='text'
              value={education.address}
              className='mb-3'
              onChange={(e) => { handleEducationChange(e, index) }}
              placeholder='University address' />

            <Input
              name='year'
              type='text'
              value={education.year}
              className='mb-3'
              onChange={(e) => { handleEducationChange(e, index) }}
              placeholder='Year' />
            
          </div>
        ))
      }

      <div className='flex justify-between mt-3'>
        <Button variant='outline' onClick={addEducation}>
          <Plus size={18} className='mr-2' />Add
        </Button>


        {educationList.length > 1 && (
          <Button variant='outline' onClick={removeEducation}>
            <X size={18} className='mr-2' />Remove
          </Button>
        )}

        <Button variant='outline' onClick={handleEducationSubmit}>
          <ArrowRight size={18} className='mr-2' />Next
        </Button>
      </div>
    </div>
  )
}
