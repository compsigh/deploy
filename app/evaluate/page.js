// Next imports
import { redirect } from 'next/navigation'
import Script from 'next/script'

// Auth imports
import { getSessionData } from '@/functions/user-management'

// Component imports
import ParamsValidator from '@/components/ParamsValidator'

// Function imports
import { fetchJudge } from '@/functions/notion'

export default async function ProjectEvaluation () {
  const user = await getSessionData()
  if (!user)
    redirect('/')

  const judge = await fetchJudge(user)
  if (!judge)
    redirect('/console')

  return (
    <>
      <ParamsValidator
        expect={{
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1],
          email: user.email
        }}
        redirect='/console'
      />
      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/mZ29ja?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="300"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="DEPLOY/23 Project Evaluation">
      </iframe>
    </>
  )
}
