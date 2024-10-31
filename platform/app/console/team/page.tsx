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

export default async function TeamDeclaration() {
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
