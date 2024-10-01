import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"
import { ArrowRight, Plus, X, Loader2Icon, Brain } from "lucide-react"
import { useResumeContext } from '@/context/resume';


export default function StepThree() {
  const {
    experienceList,
    experienceLoading,
    handleExperienceSubmit,
    handleExperienceGenerateWithAi,
    handleExperienceQuillChange,
    addExperience,
    removeExperience,
    handleExperienceChange,
  } = useResumeContext();
  //state
  const [loading, setLoading] = React.useState(false);
  function handleSubmit(): void {
    setLoading(true);
    handleExperienceSubmit();
    setLoading(false);
  }

  return (
    <div className='w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto'>
      <h2 className='text-2xl font-bold mb-5'>Experience</h2>
      {experienceList?.length > 0 &&
        experienceList?.map((experience, index) => (
          <div className='mb-10' key={index}>
            <Input
              name='title'
              type='text'
              value={experience.title}
              className='mb-3'
              onChange={(e) => { handleExperienceChange(e, index) }}
              placeholder='Job title'
              autoFocus
            />

            <Input
              name='company'
              type='text'
              value={experience.company}
              className='mb-3'
              onChange={(e) => { handleExperienceChange(e, index) }}
              placeholder='Company name' />

            <Input
              name='address'
              type='text'
              value={experience.address}
              className='mb-3'
              onChange={(e) => { handleExperienceChange(e, index) }}
              placeholder='Company address' />

            <Input
              name='startDate'
              type='text'
              value={experience.startDate}
              className='mb-3'
              onChange={(e) => { handleExperienceChange(e, index) }}
              placeholder='Start date' />

            <Input
              name='endDate'
              type='text'
              value={experience.endDate}
              className='mb-3'
              onChange={(e) => { handleExperienceChange(e, index) }}
              placeholder='End date' />

            <ReactQuill
              theme="snow"
              value={experience.summary}
              onChange={(value) => handleExperienceQuillChange(value, index)}
            />
            <div className='flex justify-end'>
              <Button
                className='mt-3'
                variant='destructive'
                onClick={() => { handleExperienceGenerateWithAi(index) }}
                disabled={experienceLoading[index]}
              >
                {experienceLoading[index] ? (
                  <Loader2Icon size={18} className='mr-2 animate-spin' />
                ) : (<Brain size={18} className='mr-2' />)}
                Generate with AI
              </Button>
            </div>
          </div>
        ))
      }

      <div className='flex justify-between mt-3'>
        <Button 
        disabled={loading}
        variant='outline' onClick={addExperience}>
          <Plus size={18} className='mr-2' />Add
        </Button>


        {experienceList.length > 1 && (
          <Button 
          disabled={loading}
          variant='outline' onClick={removeExperience}>
            <X size={18} className='mr-2' />Remove
          </Button>
        )}

        <Button 
        disabled={loading}
        variant='outline' onClick={handleSubmit}>
          <ArrowRight size={18} className='mr-2' />Next
        </Button>
      </div>
    </div>
  )
}
