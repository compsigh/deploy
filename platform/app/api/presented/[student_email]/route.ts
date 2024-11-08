import { getTeamById } from "@/functions/db/team"
import { getProjectById } from "@/functions/db/project"
import { getParticipantByEmail } from "@/functions/db/participant"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ student_email: string }> }
) {
  const student_email = (await params).student_email
  const participant = await getParticipantByEmail(student_email)
  if (!participant)
    return new Response("Student not found", { status: 404 })

  // Consider the student presented if their team has an associated project with at least one judge evaluation
  const team = await getTeamById(participant.teamId)
  if (!team)
    return new Response("Team not found", { status: 404 })

  const project = await getProjectById(team.project?.id)
  if (!project) {
    return new Response(JSON.stringify({ presented: false }), {
      headers: {
        "content-type": "application/json"
      }
    })
  }

  const evaluations = project.evaluations
  const presented = evaluations.length > 0

  return new Response(JSON.stringify({ presented }), {
    headers: {
      "content-type": "application/json"
    }
  })
}
