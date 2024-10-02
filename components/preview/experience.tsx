import { Resume } from '@/models/resume'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.bubble.css';

export default function Experience({ resume }: { resume: Resume }) {
    return (
        <div className='my-6'>
            <h2
                className='text-center font-bold text-sm mb-2' style={{ color: resume.themeColor }}>
                Professioal Experience
            </h2>
            <hr style={{borderColor:resume.themeColor}}/>

            {resume?.experience?.map((exp,index)=>{
                return (
                    <div className='my-5' key={index}>
                        <h2 className='text-sm font-bold'>{exp?.title}</h2>
                        <h2 className='text-sm'>{exp?.company}</h2>
                        <p className='text-xs text-gray-600'>{exp?.address}</p>

                        <ReactQuill
                        id={String(index)}
                            readOnly={true}
                            value={exp.summary}
                            theme='bubble'
                            className='text-sm font-normal'
                            />
                    </div>
                );
            })}
        </div>
    )
}
