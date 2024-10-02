'use client';
import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Download from "@/public/download.png"
import Share from "@/public/share.png"
import Print from "@/public/Print.png"
import { useResumeContext } from '@/context/resume';
import { Resume } from '@/models/resume';
import ResumeCard from '@/components/cards/resume-card';
import { useRouter } from 'next/navigation'
export default function DownloadPage({ params }: { params: any }) {
    const { resumes } = useResumeContext();
    //state
    const [currentResume, setCurrentStateResume] = React.useState<Resume>();
    const router = useRouter();
    React.useEffect(() => {
        if (resumes && params?._id) {
            const resume = resumes.find((r) => (r._id === params._id));
            setCurrentStateResume(resume);
        }
    }, [resumes, params._id]);
    const printResume = () => {
        // router.push(`/resume/${currentResume?._id}`);
        const url = `/resume/${currentResume?._id}`;
        const newWindow = window.open(url, '_blank'); // Open in a new tab
    };
    // const printResume = () => {
    //     if (typeof(window) !== 'undefined' && currentResume){
    //         const newWindow = window.open(`/resume/${currentResume?._id}`, '_blank');
    //         if (newWindow) {
    //             newWindow.onload = () => {
    //                 setTimeout(() => {
    //                     newWindow?.print();
    //                 }, 300);
    //             }
    //         }
    //     }
    // }
    return (
        <div className='flex justify-center items-center min-h-screen my-20 mx-5 overflow-auto'>
            <div className='text-center w-full md:w-1/3'>
                <h2 className='font-bold text-lg'>
                    🎉Contrats! Your AI powered resume is ready!
                </h2>
                <p>You can now download,print or share it with anyone.</p>
                <div className='flex justify-between my-20'>
                    <div className='flex flex-col items-center'>
                        <Image
                            src={Download}
                            width={50}
                            height={50}
                            alt='download'
                        />
                        <Button className='my-2'>Download</Button>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Image
                            src={Print}
                            width={50}
                            height={50}
                            alt='download'
                        />
                        <Button onClick={printResume} className='my-2'>Print</Button>
                    </div>

                    <div className='flex flex-col items-center'>
                        <Image
                            src={Share}
                            width={50}
                            height={50}
                            alt='download'
                        />
                        <Button className='my-2'>Share</Button>
                    </div>
                </div>
                {currentResume && <ResumeCard resume={currentResume} />}
                <div className='mb-10'></div>
            </div>
        </div>
    )
}
