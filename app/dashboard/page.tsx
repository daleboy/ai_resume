"use client";
import React from 'react'
import { useResumeContext } from "@/context/resume"
import { SkeletonCard } from '@/components/cards/skeleton-cards';
import ResumeCard from "@/components/cards/resume-card"
export default function Dashboard() {
  const { resumes } = useResumeContext();
  if (!resumes?.length) {
    return (
      <div>
        <p className='text-center my-5'>Loading...</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5'>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    );
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 px-5'>
      {resumes.map((resume, index) => (
        <ResumeCard key={resume._id} resume={resume} />
      ))}
    </div>
  )

}
