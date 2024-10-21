// Next
import { redirect } from "next/navigation"
import Script from "next/script"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Components
import { ParamValidator } from "@/components/ParamValidator"

// Functions
import { getParticipantByEmail } from "@/functions/db/participant"
import { getTeamById } from "@/functions/db/team"

export default async function ProjectSubmission() {
  const session = await auth()
  const user = checkAuth(session)
  if (!user)
    redirect("/")

  const participant = await getParticipantByEmail(user.email)
  if (!participant)
    redirect("/console")

  const team = await getTeamById(participant.teamId)

  const expectedParams: Record<string, string> = {
    participant_email: user.email,
    teamname: team.name
  }

  return (
    <>
      <ParamValidator
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
