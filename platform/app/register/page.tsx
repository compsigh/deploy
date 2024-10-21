// Next
import { redirect } from "next/navigation"
import Script from "next/script"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Functions
import { getParticipantByEmail } from "@/functions/db/participant"

export default async function ParticipantRegistration() {
  const session = await auth()
  const user = checkAuth(session)
  if (!user)
    redirect("/")

  const registered = await getParticipantByEmail(user.email)
  if (registered)
    redirect("/console")

  return (
    <>
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
