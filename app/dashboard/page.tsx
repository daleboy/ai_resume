"use client";
import React from 'react'
import {useResume} from "@/context/resume"
export default  function Dashboard() {
    const {resumes} = useResume();
    return (
      <div>
        <pre>
          {JSON.stringify(resumes,null,4)}
        </pre>
      </div>
    )
}
