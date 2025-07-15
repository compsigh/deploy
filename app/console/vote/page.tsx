// Next
import { redirect } from "next/navigation"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Functions
import { getAllProjects } from "@/functions/db/project"
import { createVoteServerAction } from "@/functions/actions"
import { getParticipantByEmail } from "@/functions/db/participant"

// Components
import { PlayH1 } from "@/components/PlayH1"

// Styles
import styles from "@/app/console/Page.module.css"
import { Button } from "@/components/Button"
import { Spacer } from "@/components/Spacer"
import { getTeamById } from "@/functions/db/team"

export default async function PeoplesChoiceVote() {
  const session = await auth()
  if (!session)
    redirect("/")
  const authed = checkAuth(session)
  if (!authed)
    redirect("/console/unauthorized")
  const user = authed

  const participant = await getParticipantByEmail(user.email)
  if (!participant)
    redirect("/console")

  const projects = await getAllProjects()
  return (
    <>
    <main className={styles.main}>
      <PlayH1>Welcome, Hacker</PlayH1>
      <h2 className={styles.heading}>People&apos;s Choice Vote</h2>
      <p>Pick your favorite project! You can vote only once.</p>
      <form action={createVoteServerAction}>
        <input type="hidden" name="participantEmail" value={user.email} />
        <select name="projectId" required>
          {
            projects.map(async (project) => {
              const team = await getTeamById(project.teamId)
              if (!team)
                throw new Error("Team not found")
              return (
                <option key={project.id} value={project.id}>{project.name} — {team.name}</option>
            )})
          }
        </select>
        <Spacer size={32} />
        <Button type="submit">Vote</Button>
      </form>
    </main>
    </>
  )
}
