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

export default async function ParticipantRegistration() {
  const session = await auth()
  const user = checkAuth(session)
  if (!user)
    redirect('/')

  const registered = await fetchParticipantNotionPage(user)
  if (registered)
    redirect('/console')

  return (
    <>
      <ParamValidator
        expect={{
          firstName: user.name.split(' ')[0],
          lastName: user.name.split(' ')[1],
          email: user.email
        }}
        redirect="/console"
      />
      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/w7KEWZ?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="300"
        title="DEPLOY/23 Participant Registration"
      ></iframe>
    </>
  )
}
