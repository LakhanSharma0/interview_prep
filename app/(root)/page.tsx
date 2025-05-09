import React from 'react'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import  InterviewCard  from '@/components/InterviewCard'
const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get interview-Ready with AI-Powered Practice & Feedback 
          </h2>
          <p className='text-lg'>
            Practice job interviews with AI and get personalized feedback to improve your skills. 
            <br />
            <br />
            Sign up now to start your journey towards acing your next interview!
            <br />
            <br />
          </p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link href='/interview'>Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          alt="robot"
          width={400}
          height={400}
          className='max-sm:hidden'
        />

      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interview</h2>
        <div className='interviews-section'>
        {
          dummyInterviews.map((interview) => (
              <InterviewCard
                key={interview.id}
                userId={interview?.userId}
                interviewId={interview.id}
                role={interview.role}
                type={interview.type}
                techstack={interview.techstack}
                createdAt={interview.createdAt}
              />
            ))
          }
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take Interviews</h2>
        <div className="interviews-section">
          <p>There are no interviews available</p>
        </div>

      </section>
    </>
  )
}

export default page