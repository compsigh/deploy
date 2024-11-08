// Functions
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { checkAuth } from "@/functions/user-management"
import { getAllParticipants } from "@/functions/db/participant"

// Components
import Link from "next/link"
import { PlayH1 } from "@/components/PlayH1"

// Styles
import styles from "@/app/console/Page.module.css"

export default async function Attendees() {
  const session = await auth()
  const user = checkAuth(session)
  if (!session)
    redirect("/")
  if (!user)
    redirect("/console/unauthorized")

  const participants = await getAllParticipants()
  return (
    <>
      <main className={styles.main}>
        <PlayH1>Welcome, Hacker</PlayH1>
        <h2>Who&apos;s going to DEPLOY/24</h2>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <ul>
          {
            participants.map(participant => (
              <li key={participant.email}>
                {participant.name.split(" ")[0]} {participant.name.split(" ")[1][0]}.
                <br />
                <span style={{ color: "var(--color-light-50)" }}>
                  {
                    participant.graduatingClass.toString().startsWith("CO")
                      ? `Class of ${participant.graduatingClass.toString().substring(2)}`
                      : "Graduate"
                  }
                </span>
              </li>
            ))
          }
        </ul>
      </main>
    </>
  )
}
