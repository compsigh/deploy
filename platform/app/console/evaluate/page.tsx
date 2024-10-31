// Next
import { redirect } from "next/navigation"
import Script from "next/script"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Components
import { ParamValidator } from "@/components/ParamValidator"

// Functions
import { getJudgeByEmail } from "@/functions/db/judge"

export default async function ProjectEvaluation() {
  const session = await auth()
  const user = checkAuth(session)
  if (!session)
    redirect("/")
  if (!user)
    redirect("/console/unauthorized")

  const judge = await getJudgeByEmail(user.email)
  if (!judge)
    redirect("/console")

  return (
    <>
      <ParamValidator
        expect={{
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1],
          email: user.email
        }}
        redirect="/console"
      />
      <Script async src="https://tally.so/widgets/embed.js" />
      <iframe
        data-tally-src="https://tally.so/embed/mZ29ja?transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="300"
        title="DEPLOY/23 Project Evaluation"
      ></iframe>
    </>
  )
}
