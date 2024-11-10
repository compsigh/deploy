// Next
import { redirect } from "next/navigation"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Functions
import { getTeamById } from "@/functions/db/team"
import { submitProjectServerAction } from "@/functions/actions"
import { getParticipantByEmail } from "@/functions/db/participant"

// Components
import Link from "next/link"
import { PlayH1 } from "@/components/PlayH1"
import { Button } from "@/components/Button"

// Styles
import styles from "@/app/console/Page.module.css"
import submitPageStyles from "@/app/console/submit/Submit.module.css"

export default async function ProjectSubmission() {
  const session = await auth()
  if (!session)
    redirect("/")
  const authed = checkAuth(session)
  if (!authed)
    redirect("/console/unauthorized")
  const user = authed
  const registered = await getParticipantByEmail(user.email)
  if (!registered)
    redirect("/console")
  const participant = registered
  const team = await getTeamById(participant.teamId)
  if (!team)
    throw new Error("Participant is not on a team")
  const projectSubmitted = team.project
  if (projectSubmitted)
    redirect("/console")

  return (
    <>
      <main className={`${styles.main} ${submitPageStyles.main}`}>
        <PlayH1>Welcome, Hacker</PlayH1>
        <h2 className={styles.heading}>Project Submission</h2>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <p>
          Alright, team <strong>{team.name}</strong> — let&apos;s get your project in.
          <br />
          <em>Please note you can&apos;t edit your submission after.</em>
        </p>
        <form action={submitProjectServerAction}>
          <input type="hidden" name="teamId" value={team.id} />
          <div>
            <label htmlFor="name">Project name</label>
            <input type="text" name="name" required />
          </div>
          <div>
            <label htmlFor="type">Project type</label>
            <select name="type" required>
              <option value="">Project Type</option>
              <option value="mobile">Mobile app</option>
              <option value="desktop">Desktop app</option>
              <option value="applet">Applet</option>
              <option value="game">Game</option>
              <option value="webapp">Web app</option>
              <option value="website">Website</option>
              <option value="oss">Open source contribution</option>
              <option value="hardware">Hardware</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <div>
              <label htmlFor="link">Project link</label>
              <p>Please remember to open-source your project for the judges!</p>
            </div>
            <input type="url" name="link" required />
          </div>
          <div>
            <div>
              <label htmlFor="notes">Notes</label>
              <p>Anything you want the judges to know?</p>
            </div>
            <textarea name="notes" />
          </div>
          <div>
            <label htmlFor="song">Song to walk out to</label>
            <input type="text" name="song" />
          </div>
          <Button type="submit">Submit project</Button>
        </form>
      </main>
    </>
  )
}
