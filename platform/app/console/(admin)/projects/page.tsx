// Auth
import { auth } from "@/auth"
import { checkAuth, isOrganizer } from "@/functions/user-management"

// Functions
import { redirect } from "next/navigation"
import { getTeamById } from "@/functions/db/team"
import { getAllProjects } from "@/functions/db/project"
import { deleteProjectServerAction } from "@/functions/actions"

// Components
import Link from "next/link"
import { Button } from "@/components/Button"

// Styles
import styles from "@/app/console/Page.module.css"

async function TeamList({ teamId }: { teamId: string }) {
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

export default async function CheckIn() {
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

  const projects = await getAllProjects()
  return (
    <>
      <main className={styles.main} style={{ maxWidth: "1400px" }}>
        <h1>Admin Panel</h1>
        <h2>Projects</h2>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Submitted by</th>
              <th>Notes</th>
              <th>Song</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              projects
              .map(project => {
                return (
                  <tr key={project.id}>
                    <td>
                      <Link href={project.link}>{project.name}</Link>
                      <br />
                      <small>{project.type}</small>
                    </td>
                    <td>
                      <TeamList teamId={project.teamId} />
                    </td>
                    <td style={{ maxWidth: 400 }}>{project.notes}</td>
                    <td>{project.song}</td>
                    <td>
                      <form action={deleteProjectServerAction}>
                        <input type="hidden" name="id" value={project.id} />
                        <Button type="submit" style="secondary">Reset submission</Button>
                      </form>
                    </td>
                  </tr>
            )})}
          </tbody>
        </table>
      </main>
    </>
  )
}
