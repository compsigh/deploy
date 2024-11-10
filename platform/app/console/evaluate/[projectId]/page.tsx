// Auth
import { auth } from "@/auth"
import { checkAuth, isJudge } from "@/functions/user-management"

// Components
import { PlayH1 } from "@/components/PlayH1"
import { Button } from "@/components/Button"

// Functions
import { redirect } from "next/navigation"
import { getProjectById } from "@/functions/db/project"
import { evaluateProjectServerAction } from "@/functions/actions"

// Styles
import styles from "@/app/console/Page.module.css"
import evaluateProjectStyles from "@/app/console/evaluate/[projectId]/EvaluateProject.module.css"

export default async function EvaluateProject({ params }: { params: { projectId: string } }) {
  const session = await auth()
  if (!session)
    redirect("/")
  const authed = checkAuth(session)
  if (!authed)
    redirect("/console/unauthorized")
  const user = authed
  const judge = isJudge(user)
  if (!judge)
    redirect("/console")

  const project = await getProjectById(params.projectId)
  if (!project)
    throw new Error("Project not found")

  return (
    <>
      <main className={`${styles.main} ${evaluateProjectStyles.main}`}>
        <PlayH1>Welcome, Judge</PlayH1>
        <h2 className={styles.heading}>Project Evaluations</h2>
        <h3 className={styles.heading}>{project.name}</h3>
        <form action={evaluateProjectServerAction}>
          <input type="hidden" name="id" value={project.id} />
          <input type="hidden" name="judgeName" value={user.name} />
          <input type="hidden" name="judgeEmail" value={user.email} />
          <div>
            <label htmlFor="criterion1">(1-4) Despite the time limit, the team showcased their effort in creating a polished solution, with attention to detail and user experience.</label>
            <input type="number" name="criterion1" min="1" max="4" required />
          </div>
          <div>
            <label htmlFor="criterion2">(1-4) The team presented their project in a creative and engaging way.</label>
            <input type="number" name="criterion2" min="1" max="4" required />
          </div>
          <div>
            <label htmlFor="criterion3">(1-4) The team defined the problem they sought to solve, identifying a clear and focused target user, need, and context.</label>
            <input type="number" name="criterion3" min="1" max="4" required />
          </div>
          <div>
            <label htmlFor="criterion4">(1-4) The team showcased their prototype solution, mentioning whether or not they accomplished their goal. If the project was incomplete, the team mentioned what worked, what didn&apos;t, and how the team would continue to develop the project.</label>
            <input type="number" name="criterion4" min="1" max="4" required />
          </div>
          <div>
            <label htmlFor="criterion5">(1-4) The team took on an ambitious challenge, through the scale &amp; scope of the problem, their tech stack, or otherwise impressive medium.</label>
            <input type="number" name="criterion5" min="1" max="4" required />
          </div>
          <div>
            <label htmlFor="vibes">(1-4) The vibes. How cool / compensation for missing the mark on other criteria like defining a problem. Meant to accommodate teams that maybe don&apos;t talk about a specific problem, etc.</label>
            <input type="number" name="vibes" min="1" max="4" required />
          </div>
          <Button type="submit">Submit evaluation</Button>
        </form>
      </main>
    </>
  )
}
