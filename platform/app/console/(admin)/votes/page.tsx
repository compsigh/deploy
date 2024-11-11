// Auth
import { auth } from "@/auth"
import { checkAuth, isOrganizer } from "@/functions/user-management"

// Functions
import { redirect } from "next/navigation"
import { getTeamById } from "@/functions/db/team"
import { getProjectById } from "@/functions/db/project"
import { getAllVotes, getProjectVotes } from "@/functions/db/vote"

// Components
import Link from "next/link"

// Styles
import styles from "@/app/console/Page.module.css"

export default async function Votes() {
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

  const votes = await getAllVotes()

  return (
    <>
      <main className={styles.main}>
        <h1>Admin Panel</h1>
        <h2 className={styles.heading}>People&apos;s Choice Votes</h2>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Project — Team</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {
              votes.map(async (vote) => {
                const project = await getProjectById(vote.projectId)
                if (!project)
                  throw new Error("Project not found")
                const team = await getTeamById(project.teamId)
                if (!team)
                  throw new Error("Team not found")
                const projectVotes = await getProjectVotes(project.id)
                return (
                  <tr key={vote.id}>
                    <td>{project.name} — {team.name}</td>
                    <td>{projectVotes.length}</td>
                  </tr>
              )})
            }
          </tbody>
        </table>
      </main>
    </>
  )

}
