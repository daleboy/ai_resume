import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ArrowRight, Plus, X } from "lucide-react"
import { useResumeContext } from '@/context/resume';

export default function StepFive() {
  const {
    skillList,
    handleSkillChange,
    handleSkillSubmit,
    addSkill,
    removeSkill,
  } = useResumeContext();

  const skillLevels = [
    { label: 'Poor', value: 1 },
    { label: 'Basic', value: 2 },
    { label: 'Moderate', value: 3 },
    { label: 'Advanced', value: 4 },
    { label: 'Expert', value: 5 },
  ]

  return (
    <div className='w-full p-5 shadow-lg border-t-4 rounded-lg overflow-y-auto'>
      <h2 className='text-2xl font-bold mb-5'>Skills</h2>
      {skillList?.length > 0 &&
        skillList?.map((skill, index) => (
          <div className='mb-10' key={index}>
            <Input
              name='name'
              type='text'
              value={skill.name}
              className='mb-3'
              onChange={(e) => { handleSkillChange({ target: { name: 'name', value: e.target.value } }, index) }}
              placeholder='Skill name'
              autoFocus
            />

            <div className='flex space-x-2'>
              {skillLevels.map((level) => (
                <Button
                  key={level.value}
                  variant={Number(skill.level) === level.value?"secondary":"link"}
                  onClick={() => handleSkillChange({target: { name: 'level', value: String(level.value) }}, index)}
                >
                  {level.label}
                </Button>
              ))}
            </div>

          </div>
        ))
      }

      <div className='flex justify-between mt-3'>
        <Button variant='outline' onClick={addSkill}>
          <Plus size={18} className='mr-2' />Add
        </Button>

        {skillList.length > 1 && (
          <Button variant='outline' onClick={removeSkill}>
            <X size={18} className='mr-2' />Remove
          </Button>
        )}

        <Button variant='outline' onClick={handleSkillSubmit}>
          <ArrowRight size={18} className='mr-2' />Next
        </Button>
      </div>
    </div>
  )
}
