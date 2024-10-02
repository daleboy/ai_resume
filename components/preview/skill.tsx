import React from 'react'
import { Progress } from "@/components/ui/progress"
import { Star } from "lucide-react"
import { type SkillProps } from '@/models/resume'
export default function Skill({ props }: { props: SkillProps }) {
  const resume = props.resume;
  const themeColor = resume?.themeColor || "#333";

  const defalutColor = "#d3d3d3"
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2' style={{ color: themeColor }}>
        Skills
      </h2>
      <hr style={{ borderColor: themeColor }} />

      <div className='grid grid-cols-2 gap-3 my-4'>
        {resume?.skills?.map((skill, index) => {
          return (
            <div key={index} className='flex items-center justify-between'>
              <h2 className='text-sm font-bold'>{skill?.name}</h2>

              <div className='flex-1 ml-2'>
                {props.print ? (
                  <div className='flex items-center'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i}
                        className='w-5 h-5'
                        style={{ color: i < Number(skill.level) ? themeColor : defalutColor }}
                      />
                    ))}
                  </div>) : (
                  <div>
                    <Progress value={Number(skill.level) * 20} color={themeColor} />
                  </div>)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
