// Auth
import { auth } from "@/auth"
import { checkAuth, isOrganizer } from "@/functions/user-management"

// Functions
import { redirect } from "next/navigation"
import { weigh } from "@/functions/scoreboard"
import { getTeamById } from "@/functions/db/team"
import { getProjectById } from "@/functions/db/project"
import { deleteEvaluationServerAction } from "@/functions/actions"
import { getAllEvaluations, getEvaluationsByProjectId } from "@/functions/db/evaluation"

// Components
import Link from "next/link"
import { Button } from "@/components/Button"

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
              <th>Evaluation score</th>
              <th>Average score of all evaluations</th>
              <th>Weighted score</th>
              <th>Actions</th>
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

                const projectEvaluations = await getEvaluationsByProjectId(evaluation.projectId)
                const totalScore = projectEvaluations.reduce((acc, evaluation) => acc + evaluation.criterion1 + evaluation.criterion2 + evaluation.criterion3 + evaluation.criterion4 + evaluation.criterion5 + evaluation.vibes, 0)
                const averageScore = totalScore / projectEvaluations.length
                const weightedScore = await weigh(team.id, averageScore)

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
                  <td>{averageScore}</td>
                  <td>{weightedScore}</td>
                  <td>
                    <form action={deleteEvaluationServerAction}>
                      <input type="hidden" name="id" value={evaluation.id} />
                      <Button type="submit" style="secondary">Delete</Button>
                    </form>
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
