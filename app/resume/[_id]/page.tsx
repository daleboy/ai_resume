
'use client';
import React from 'react'
import PersonalDetail from '@/components/preview/personal-detail'
import Education from '@/components/preview/education'
import Summary from '@/components/preview/summary'
import Experience from '@/components/preview/experience'
import Skill from '@/components/preview/skill'
import { useResumeContext } from '@/context/resume'
import { Resume } from '@/models/resume'


// export  function generateMetadata({ params }: { params: any }){
//     const { resumes } = useResumeContext();
//     const resume = resumes.find((r) => (r._id === params._id));

//     return {
//         title:`${resume?.name} -Resume`,
//         description:resume?.summary,
//         openGraph:{
//             title:`${resume?.name} -Resume`,
//             description:resume?.summary,
//             images:['/logo.svg'],
//         }
//     }
// };
export default function ResumePage({ params }: { params: {_id:string} }) {
    const { resumes } = useResumeContext();
    const [currentResume, setCurrentStateResume] = React.useState<Resume>();
    React.useEffect(() => {
        if (resumes && params?._id) {
            const resume = resumes.find((r) => (r._id === params._id));
            setCurrentStateResume(resume);
        }
    }, [resumes, params._id]);
    React.useEffect(() => {
        if (currentResume) {
            const timer = setTimeout(() => {
                window?.print();
            }, 300);
            return () => clearTimeout(timer); // Clear timeout on unmount
        }
    }, [currentResume]);
    return currentResume && (
        <div className='m-20'>
            <PersonalDetail resume={currentResume} />
            <Summary resume={currentResume} />
            <Experience resume={currentResume} />
            <Education resume={currentResume} />
            <Skill props={{ resume: currentResume, print: 'print' }} />
        </div>
    )
}
