// Next imports
import { redirect } from 'next/navigation'
import Script from 'next/script'

// Auth imports
import { getSessionData } from '@/functions/user-management'

import NamedRedirect from '@/components/NamedRedirect'

export default async function Dashboard () {
  const user = await getSessionData()
  if (!user)
    redirect('/')

  return (
    <>
      <NamedRedirect user={user} />
      <h1>Authenticated as:</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/w7KEWZ?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="146"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="DEPLOY/23 Participant Registration">
      </iframe>
    </>
  )
}
