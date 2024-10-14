// Next
import { redirect } from 'next/navigation'
import Script from 'next/script'

// Auth
import { auth } from '@/auth'
import { checkAuth } from '@/functions/user-management'

// Components
import ParamsValidator from '@/components/ParamsValidator'

// Functions
import { fetchJudgeNotionPage } from '@/functions/notion'

export default async function ProjectEvaluation() {
  const session = await auth()
  const authed = await checkAuth(session)
  if (!authed)
    redirect('/')
  const user = session.user

  const judge = await fetchJudgeNotionPage(user)
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
        redirect="/console"
      />
      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/mZ29ja?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="300"
        title="DEPLOY/23 Project Evaluation"
      ></iframe>
    </>
  )
}
