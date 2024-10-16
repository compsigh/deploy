// Next
import { redirect } from 'next/navigation'
import Script from 'next/script'

// Auth
import { auth } from '@/auth'
import { checkAuth } from '@/functions/user-management'

// Components
import ParamsValidator from '@/components/ParamsValidator'

// Functions
import {
  fetchParticipantNotionPage,
  fetchParticipantTeamNotionPage,
  type TitlePagePropertyType
} from '@/functions/notion'

export default async function ProjectSubmission() {
  const session = await auth()
  const authed = checkAuth(session)
  if (!authed)
    redirect('/')
  const user = session.user

  const participant = await fetchParticipantNotionPage(user)
  if (!participant)
    redirect('/console')

  const team = await fetchParticipantTeamNotionPage(participant)
  const teamNameProperty = team.properties.Name as TitlePagePropertyType
  const teamName = teamNameProperty.title[0].text.content

  const expectedParams: Record<string, string> = {
    participant_email: user.email,
    teamname: teamName
  }

  return (
    <>
      <ParamsValidator
        expect={expectedParams}
        redirect="/console"
      />
      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/mZ2OlB?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="300"
        title="DEPLOY/23 Project Submission"
      ></iframe>
    </>
  )
}
