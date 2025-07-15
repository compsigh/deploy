// Auth
import { auth } from "@/auth"
import { checkAuth, isOrganizer } from "@/functions/user-management"

// Functions
import { redirect } from "next/navigation"
import { getAllTeams, getTeamById } from "@/functions/db/team"

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

export default async function Teams() {
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

  const teams = await getAllTeams()
  return (
    <>
      <main className={styles.main}>
        <h1>Admin Panel</h1>
        <h2>Teams</h2>
        <p>Displaying only those checked in on opening night</p>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Team name</th>
              <th>Participants</th>
            </tr>
          </thead>
          <tbody>
            {
              teams
              .filter(team => team.participants.some(participant => participant.attended))
              .map((team, index) => (
                <tr key={team.id}>
                  <td>{index + 1}</td>
                  <td>{team.name}</td>
                  <td>
                    <TeamMembersList teamId={team.id} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>
    </>
  )
}
