// Auth
import { auth } from "@/auth"
import {
  checkAuth,
  isJudge,
  isOrganizer
} from "@/functions/user-management"

// Functions
import { redirect } from "next/navigation"
import { getAllParticipants } from "@/functions/db/participant"

// Components
import Link from "next/link"

// Styles
import styles from "@/app/console/Page.module.css"

export default async function Participants() {
  const session = await auth()
  if (!session)
    redirect("/")
  const authed = checkAuth(session)
  if (!authed)
    redirect("/console/unauthorized")
  const user = authed
  const organizer = isOrganizer(user)
  const judge = isJudge(user)
  if (!organizer && !judge)
    redirect("/console")

  const participants = await getAllParticipants()
  return (
    <>
      <main
        className={styles.main}
        style={{ maxWidth: "1400px" }}
      >
        <h1>DEPLOY/24</h1>
        <h2>Participants</h2>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <table>
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Graduating Class</th>
            <th>Attended</th>
          </thead>
          <tbody>
            {
              participants
              .sort((a, b) => b.name.localeCompare(a.name))
              .sort(participant => participant.attended ? -1 : 1)
              .map((participant, index) => (
                <tr key={participant.email}>
                  <td>{index + 1}</td>
                  <td>{participant.name}</td>
                  <td>{participant.email}</td>
                  <td>
                    {
                      participant.graduatingClass.toString().startsWith("CO")
                        ? `Class of ${participant.graduatingClass.toString().substring(2)}`
                        : "Graduate"
                    }
                  </td>
                  <td>
                    {participant.attended ? "Yes" : "No"}
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
