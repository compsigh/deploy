// Next
import { redirect } from "next/navigation"

// Auth
import { auth } from "@/auth"
import { checkAuth, isJudge } from "@/functions/user-management"

// Functions
import { getTeamById } from "@/functions/db/team"
import { getAllProjects, getProjectById } from "@/functions/db/project"

// Components
import Link from "next/link"
import { PlayH1 } from "@/components/PlayH1"

// Styles
import styles from "@/app/console/Page.module.css"

async function getProjectTeamName(projectId: string) {
  const project = await getProjectById(projectId)
  if (!project)
    throw new Error("Project not found")
  const team = await getTeamById(project.teamId)
  if (!team)
    throw new Error("Team not found")
  return team.name
}

export default async function ProjectEvaluation() {
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

  const projects = await getAllProjects()
  return (
    <>
      <main className={styles.main}>
        <PlayH1>Welcome, Judge</PlayH1>
        <h2 className={styles.heading}>Project Evaluations</h2>
        <p>Welcome judges! Once we get going, a team presents for five minutes, judges ask questions for two minutes, then we open it up to the audience for two minutes — after which judges submit their evaluation for that team.</p>
        <p>Rinse and repeat.</p>
        <p>Please note you can&apos;t edit an evaluation after you submit it, so be sure!</p>
        <h3 className={styles.heading}>Reviewable projects</h3>
        <ul>
          {projects.map(project => {
            const team = getProjectTeamName(project.id)
            return (
            <li key={project.id}>
              <Link href={`/console/evaluate/${project.id}`}>{project.name}</Link>
              <br />
              <small>Team {team}</small>
            </li>
          )})}
        </ul>
      </main>
    </>
  )
}
