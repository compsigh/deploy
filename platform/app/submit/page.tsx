// Next
import { redirect } from "next/navigation"
import Script from "next/script"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Functions
import { getParticipantByEmail } from "@/functions/db/participant"

export default async function ProjectSubmission() {
  const session = await auth()
  const user = checkAuth(session)
  if (!user)
    redirect("/")

  const participant = await getParticipantByEmail(user.email)
  if (!participant)
    redirect("/console")

  return (
    <>
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
