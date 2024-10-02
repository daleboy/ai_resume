import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Sparkles, Download, Printer, Share2 } from "lucide-react"
export default function LandingPage() {
    return (
        <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className='relative bg-cover bg-center' style={{ backgroundImage: 'url("bg.jpg")', height: "60vh" }}>
                <div className='absolute inset-0 bg-gradient-to-b from transparent to-[#0101818] z-0'></div>
                <div className='relative z-10 flex items-center justify-center h-full'>
                    <div className='text-center'>
                        <h1 className='text-white text-5xl font-bold mb-6'>
                            Create Your Perfect Resume with AI
                        </h1>
                        <p className='text-white mb-5 max-w-2xl mx-auto'>
                            <p>Our AI-powered resume builder helps you craft professional,</p>
                            <p>eye-catching resumes in seconds.It is free to use and incredibly</p>
                            <p>easy.Stand out from the crowd and land your dream job!</p>
                        </p>
                        <Link href="/resume/create">
                            <Button size='lg' className='text-lg px-8 py-4'>
                                Get Started for Free <ArrowRight className='ml-2' />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <section id='features' className='bg-white dark:bg-gray-800 pt-20'>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-20">
                        Why Choose Our Free AI Resume Builder?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeaturedCard
                            icon={<Sparkles className="w-12 h-12 text-blue-500" />}
                            title="AI-Powered Content"
                            description="Our AI generates tailored content based on your experience and the job you're applying for,making it very easy to use."
                        ></FeaturedCard>

                        <FeaturedCard
                            icon={<Sparkles className="w-12 h-12 text-green-500" />}
                            title="Create Unlimited Resumes"
                            description="Build as many Resumes as you need,completly free.Perfect for applying to mutiple jobs or industries."
                        ></FeaturedCard>

                        <FeaturedCard
                            icon={<Sparkles className="w-12 h-12 text-purple-500" />}
                            title="Easy Customization"
                            description="Easily customize your resume with our intuitive interface.It's so simple,anyone can create a resume in minutes."
                        ></FeaturedCard>
                    </div>
                </div>
            </section>

            {/* call-to-Action Section */}
            <section className="bg-blue-600 dark:bg-blue-800 text-white py-20 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        Download,Print,or Share Your Resume in Miniutes
                    </h2>
                    <div className="flex justify-center space-x-8 mb-8">
                        <div className="flex flex-col items-center">
                            <Download className='w-12 h-12 mb-2' />
                            <span>Download</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Printer className='w-12 h-12 mb-2' />
                            <span>Download</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <Share2 className='w-12 h-12 mb-2' />
                            <span>Download</span>
                        </div>
                    </div>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        <p>Join thousands of job seekers who have successfully landed their</p>
                        <p>dream jobs using your free,easy-to-use AI-powered resum builder.</p>
                        <p>Create unlimited resumes and choose how to use them!</p>
                    </p>
                </div>
            </section>
        </div>
    )
}

function FeaturedCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">{description}</p>
        </div>
    );
}
