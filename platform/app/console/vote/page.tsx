// Next
import { redirect } from "next/navigation"
import Script from "next/script"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Functions
import { getParticipantByEmail } from "@/functions/db/participant"

export default async function PeoplesChoiceVote() {
  const session = await auth()
  const user = checkAuth(session)
  if (!session)
    redirect("/")
  if (!user)
    redirect("/console/unauthorized")

  const participant = await getParticipantByEmail(user.email)
  if (!participant)
    redirect("/console")

  return (
    <>
      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/mJOzZ4?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="400"
        title="DEPLOY/23 People's Choice Vote"
      ></iframe>
    </>
  )
}
