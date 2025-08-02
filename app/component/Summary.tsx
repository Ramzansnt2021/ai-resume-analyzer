import ScoreBadge from './ScoreBadge'
import ScoreGague from './ScoreGuage'

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70
      ? 'text-green-600'
      : score > 49
      ? 'text-yellow-500'
      : 'text-red-500'
  return (
    <div className='resume-summary'>
      <div className='category flex flex-row items-center p-4 gap-8'>
        <div>
          <p className='text-2xl'>{title}</p>
          <ScoreBadge score={score} />
        </div>
        <div>
          <p className='text-2xl'>
            <span className={textColor}>{score}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className='bg-white rounded-2xl shadow-md w-full'>
      <div className='flex flex-row items-center p-4 gap-8'>
        <ScoreGague score={feedback.overallScore} />
        <div className='flex flex-col gap-2'>
          <h2 className='!text-black font-bold'>Your Resume</h2>
          <p className='text-lg text-gray-500'>Overall</p>
          This score is calculated based on the variables listed below.
        </div>
      </div>
      <Category title='Tone & Style' score={feedback.toneAndStyle.score} />
      <Category title='Content' score={feedback.toneAndStyle.score} />
      <Category title='Structure' score={feedback.toneAndStyle.score} />
      <Category title='Skills' score={feedback.toneAndStyle.score} />
    </div>
  )
}

export default Summary
