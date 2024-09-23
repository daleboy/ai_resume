'use client'
import React from 'react'
import {useResume} from "@/app/context/resume"
export default function ResumeCreatePage() {
  const {resume} = useResume();
  return (
    <div>
      <pre>
        {JSON.stringify(resume,null,4)}
      </pre>
    </div>
  )
}
