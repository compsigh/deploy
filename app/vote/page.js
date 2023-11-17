// Next imports
import { redirect } from 'next/navigation'
import Script from 'next/script'

// Auth imports
import { getSessionData } from '@/functions/user-management'

// Component imports
import ParamsValidator from '@/components/ParamsValidator'

// Function imports
import { fetchParticipant, normalizeParticipant } from '@/functions/notion'

export default async function PeoplesChoiceVote () {
  const user = await getSessionData()
  if (!user)
    redirect('/')

  const registered = await fetchParticipant(user)
  if (!registered)
    redirect('/console')

  user.participant = await normalizeParticipant(registered)

  return (
    <>
      <ParamsValidator
        expect={{
          participant_email: user.email,
          teamname: user.participant.teamName
        }}
        redirect='/console'
      />
      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/mJOzZ4?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="400"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="DEPLOY/23 People's Choice Vote">
      </iframe>
    </>
  )
}
