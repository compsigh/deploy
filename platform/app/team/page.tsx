// Next
import { redirect } from 'next/navigation'
import Script from 'next/script'

// Auth
import { auth } from '@/auth'
import { checkAuth } from '@/functions/user-management'

// Components
import { ParamValidator } from '@/components/ParamValidator'

// Functions
import { fetchParticipantNotionPage } from '@/functions/notion'

export default async function TeamDeclaration() {
  const session = await auth()
  const authed = await checkAuth(session)
  if (!authed)
    redirect('/')
  const user = session.user

  const participant = await fetchParticipantNotionPage(user)
  if (!participant)
    redirect('/console')

  return (
    <>
      <ParamValidator
        expect={{
          participant_email: user.email
        }}
        redirect="/console"
      />
      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/wbWWAg?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="300"
        title="DEPLOY/23 Team Declaration"
      ></iframe>
    </>
  )
}
