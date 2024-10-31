// Next
import { redirect } from "next/navigation"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Functions
import { registerServerAction } from "@/functions/actions"
import { getParticipantByEmail } from "@/functions/db/participant"

// Components
import { PlayH1 } from "@/components/PlayH1"
import { Button } from "@/components/Button"

// Styles
import styles from "@/app/console/Page.module.css"
import Link from "next/link"

export default async function ParticipantRegistration() {
  const session = await auth()
  const user = checkAuth(session)
  if (!session)
    redirect("/")
  if (!user)
    redirect("/console/unauthorized")

  const registered = await getParticipantByEmail(user.email)
  if (registered)
    redirect("/console")

  return (
    <>
      <main className={styles.main}>
        <PlayH1>Welcome, Hacker</PlayH1>
        <h2 className={styles.heading}>Participant Registration</h2>
        <p>Welcome, {user.name.split(" ")[0]}. Let&apos;s get you registered for DEPLOY/24.</p>
        <form action={registerServerAction}>
          <input type="hidden" name="name" value={user.name} />
          <input type="hidden" name="email" value={user.email} />
          <select name="graduatingClass" required>
            <option value="">Graduating Class</option>
            <option value="2028">2028</option>
            <option value="2027">2027</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="Masters">Masters</option>
          </select>
          <p>By registering, you agree to the <Link href="https://compsigh.club/docs/code-of-conduct">compsigh Code of Conduct</Link>.</p>
          <Button type="submit">Register</Button>
        </form>
      </main>
    </>
  )
}
