// Auth
import { auth } from "@/auth"
import { checkAuth, isOrganizer } from "@/functions/user-management"

// Functions
import { redirect } from "next/navigation"
import { getTeamById } from "@/functions/db/team"
import { getProjectById } from "@/functions/db/project"
import { getAllEvaluations } from "@/functions/db/evaluation"

// Components
import Link from "next/link"

// Styles
import styles from "@/app/console/Page.module.css"

async function TeamMembersList({ teamId }: { teamId: string }) {
  const team = await getTeamById(teamId)
  if (!team)
    throw new Error("Project is not associated with a team")

  return (
    <>
      <p><strong>{team.name}</strong></p>
      <ul>
        {team.participants.map(participant => (
          <li key={participant.email}>
            {participant.name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default async function Evaluations() {
  const session = await auth()
  if (!session)
    redirect("/")
  const authed = checkAuth(session)
  if (!authed)
    redirect("/console/unauthorized")
  const user = authed
  const organizer = isOrganizer(user)
  if (!organizer)
    redirect("/console")

  const evaluations = await getAllEvaluations()
  return (
    <>
      <main className={styles.main} style={{ maxWidth: "1400px" }}>
        <h1>Admin Panel</h1>
        <h2>Evaluations</h2>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Participants</th>
              <th>Judge</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              evaluations
              .map(async (evaluation) => {
                const project = await getProjectById(evaluation.projectId)
                if (!project)
                  throw new Error("Project not found")
                const team = await getTeamById(project.teamId)
                if (!team)
                  throw new Error("Team not found")
                return (
                <tr key={evaluation.id}>
                  <td>
                    <TeamMembersList teamId={team.id} />
                  </td>
                  <td>
                    {evaluation.judgeName}
                  </td>
                  <td>
                    {evaluation.criterion1 + evaluation.criterion2 + evaluation.criterion3 + evaluation.criterion4 + evaluation.criterion5 + evaluation.vibes}
                  </td>
                </tr>
              )})
            }
          </tbody>
        </table>
      </main>
    </>
  )
}
