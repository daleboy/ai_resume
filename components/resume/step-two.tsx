import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useResumeContext } from "@/context/resume"
import { Brain, LoaderIcon } from "lucide-react"
// import dynamic from 'next/dynamic'
// const ReactQuill =dynamic(()=>import("react-quill"),{ssr:false});
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { callQwen } from "@/actions/ai-qwen"
import {defaultPayload} from "@/models/qwen"
import toast from 'react-hot-toast'

export default function StepTwo() {
  //context
  const { resume, setResume, updateResume, setStep } = useResumeContext();
  //state
  const [loading, setLoading] = React.useState(false);

  const handleGernateWithAi = async () => {
    setLoading(true);

    const prompt = `Generate a resume summary for a person with the following details:${JSON.stringify(resume)}`;
    // defaultPayload.input.messages[1].content = prompt;
    try {
      const gsummary = await callQwen(prompt);
      setResume({ ...resume, summary: gsummary })
    } catch (error) {
      console.error(error);
      toast.error('❌failed to generate summary with ai');
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateResume();
    setStep(3);
  };
  return (
    <div className='w-full p-5 shadow-lg border-t-4 rounded-lg'>
      <div className='flex justify-between'>
        <h2
          className='text-2xl font-bold mb-5'
          style={{ color: resume.themeColor }}
        >Summary
        </h2>
        <Button
          variant='destructive'
          onClick={handleGernateWithAi}
          disabled={loading}
        >
          {loading ? (
            <LoaderIcon size={18} className='mr-2 animate-spin' />
          ) : (<Brain size={18} className='mr-2' />)}
          Generate with AI
        </Button>
      </div>
      {/* <Textarea onChange={e=>setResume({...resume,summary:e.target.value})}
      name='summary'
        value = {resume.summary}
        className='mb-3'
        placeholder='Write a summary about yourself'
        rows={10}
        required
        /> */}
      <ReactQuill
        theme="snow"
        value={resume.summary}
        onChange={(e) => setResume({ ...resume, summary: e })} />

      <div className='flex justify-end'>
        <Button onClick={handleSubmit}>Next</Button>
      </div>

    </div>
  )
}
