import react, { type FormEvent } from 'react'
import Navbar from '~/component/Navbar'
import { useState } from 'react'
import FileUploader from '~/component/FileUploader'
import { Form } from 'react-router'

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [statusText, setStatusText] = useState()
  const [file, setFile] = useState<File | null>(null)

  const handleFileSelect = (file: File | null) => {
    setFile(file)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget.closest('form')
    if (!form) return
    const formData = new FormData(form)
    const companyNames = formData.get('company-name')
    const jobTitles = formData.get('job-title')
    const jobDescriptions = formData.get('job-description')
  }

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className='main-section'>
        <div className='page-heading py-16'>
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src='/images/resume-scan.gif' alt='resume scanner' />
            </>
          ) : (
            <h2>Drop our resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              id='uploader-form'
              onSubmit={handleSubmit}
              className='flex flex-col gap-4 mt-8'
            >
              <div className='form-div'>
                <label htmlFor='company-name'>Company Name</label>
                <input
                  type='text'
                  name='company-name'
                  placeholder='Company Name'
                  id='company-name'
                />
              </div>
              <div className='form-div'>
                <label htmlFor='job-title'>Job Title</label>
                <input
                  type='text'
                  name='job-title'
                  placeholder='Job Title'
                  id='job-title'
                />
              </div>
              <div className='form-div'>
                <label htmlFor='job-decription'>Job Description</label>
                <textarea
                  rows={5}
                  name='job-decription'
                  placeholder='Job Description'
                  id='job-description'
                ></textarea>
              </div>
              <div className='form-div'>
                <label htmlFor='uploader'>Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className='primary-button' type='submit'>
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
export default Upload
