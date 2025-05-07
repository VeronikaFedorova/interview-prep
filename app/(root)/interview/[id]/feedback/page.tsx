import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.actions';
import {
  getFeedbackByInterviewId,
  getInterviewById,
} from '@/lib/actions/general.actions';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  const interview = await getInterviewById(id);
  if (!interview) redirect('/');

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id || '',
  });

  console.log('feedback', feedback);
  return (
    <section className='section-feedback'>
      <div className='flex flex-row justify-center'>
        <h1 className='text-4xl font-semibold'>
          Feedback on the Interview - {interview.role} Interview
          <span className='capitalize'>{interview.role} Interview</span>
        </h1>
      </div>
      <div className='flex flex-row justify-center'>
        <div className='flex flex-row gap-5 max-sm:flex-col'>
          <div className='flex flex-row gap-2 items-center'>
            <Image src='/star.svg' width={15} height={15} alt='star' />
            <p>
              Overall Impression:{' '}
              <span className='text-primary-200 font-bold'>
                {feedback?.totalScore} / 100
              </span>
            </p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <Image src='/calendar.svg' width={15} height={15} alt='calendar' />
            <p>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format('MMM D, YYYY hh:mm A')
                : 'N/A'}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <p>{feedback?.finalAssessment}</p>
      <div className='flex flex-col gap-4'>
        <h2>Breakdown of the Interview:</h2>
        {feedback?.categoryScores.map((category, index) => (
          <div key={index}>
            <p className='font-bold'>
              {index + 1}. {category?.name} ({category?.score} / 100)
            </p>
            <p>{category?.comment}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <h2>Candidate Strengths</h2>
        {feedback?.strengths.map((strength, index) => (
          <ul key={index}>
            <li>{strength}</li>
          </ul>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <h2>Areas for Improvement</h2>
        {feedback?.areasForImprovement.map((area, index) => (
          <ul key={index}>
            <li>{area}</li>
          </ul>
        ))}
      </div>
      <div className='flex flex-col gap-4'>
        <h2>
          Final Verdict:{' '}
          {(feedback?.totalScore ?? 0) > 60 ? (
            <span className='text-green-300 font-medium'>Recommended</span>
          ) : (
            <span className='text-red-300 font-medium'>Not Recommended</span>
          )}
        </h2>
        <p>{feedback?.finalAssessment}</p>
      </div>
      <div className='buttons'>
        <Button className='btn-secondary flex-1'>
          <Link href='/' className='flex w-full justify-center'>
            <p className='text-sm font-semibold text-primary-200 text-center'>
              Back to dashboeard
            </p>
          </Link>
        </Button>
        <Button className='btn-primary flex-1'>
          <Link
            href={`/interview/${id}`}
            className='flex w-full justify-center'
          >
            <p className='text-sm font-semibold text-black text-center'>
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default Page;
