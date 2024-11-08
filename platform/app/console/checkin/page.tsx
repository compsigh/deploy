// Auth
import { auth } from "@/auth"
import { checkAuth, isOrganizer } from "@/functions/user-management"

// Functions
import { redirect } from "next/navigation"
import { getAllParticipants } from "@/functions/db/participant"
import { checkInParticipantServerAction } from "@/functions/actions"

// Components
import Link from "next/link"
import { Button } from "@/components/Button"
import { Spacer } from "@/components/Spacer"

// Styles
import styles from "@/app/console/Page.module.css"

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

  const participants = await getAllParticipants()
  return (
    <>
      <main className={styles.main}>
        <h1>Check-in</h1>
        <h2>Participants</h2>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <ul>
          {
            participants
            .sort((a, b) => b.name.localeCompare(a.name))
            .sort(participant => participant.attended ? 1 : -1)
            .map(participant => (
              <li key={participant.email}>
                {participant.name}
                <Spacer size={8} />
                <form action={checkInParticipantServerAction}>
                  <input type="hidden" name="email" value={participant.email} />
                  {
                    !participant.attended
                      &&
                        <Button type="submit" style="secondary">Check in</Button>
                  }
                </form>
                <Spacer size={32} />
              </li>
          ))}
        </ul>
      </main>
    </>
  )
}
