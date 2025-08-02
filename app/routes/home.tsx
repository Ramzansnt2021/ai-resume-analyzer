import type { Route } from './+types/home'
import Navbar from '../component/Navbar'
import ResumeCard from '../component/ResumeCard'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { usePuterStore } from '~/lib/puter'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Resumind' },
    {
      name: 'description',
      content: 'Smart feeback for you feed back your dream',
    },
  ]
}

export default function Home() {
  const { auth, kv } = usePuterStore()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loadingResumes, setLoadingResumes] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isAuthenticated) navigate('/auth?next=/')
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true)
      const resumes = (await kv.list('resume:*', true)) as KVItem[]

      const parseResume = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume
      )
      console.log('parseResume', parseResume)
      setResumes(parseResume || [])
      setLoadingResumes(false)
    }
    loadResumes()
  }, [])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className='main-section'>
        <div className='page-heading py-16'>
          <h1>Track Your Applications & Resume Raitings</h1>
          {!loadingResumes && resumes.length === 0 ? (
            <h2>No Resumes Found. Upload Your First Resume to get feedback.</h2>
          ) : (
            <h2>Review your submissions and check AI-powered feedback.</h2>
          )}
        </div>
        {!loadingResumes && (
          <div className='flex flex-col items-center justify-center'>
            <img
              src='/images/resume-scan-2.gif'
              alt='resume-scanner'
              className='w-[200px'
            />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className='resumes-section'>
            {
              !resumes.map((resume) => (
                <ResumeCard key={resume.id} resume={resume} />
              ))
            }
          </div>
        )}

        {!loadingResumes && resumes.length === 0 && (
          <div className='flex flex-col items-center justify-center mt-10 gap-4'>
            <Link
              to='/upload'
              className='primary-button w-fit text-xl font-semibold'
            >
              Upload Your Resume
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
