import { getParticipantByEmail } from "@/functions/db/participant"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ student_email: string }> }
) {
  const student_email = (await params).student_email
  const participant = await getParticipantByEmail(student_email)
  if (!participant)
    return new Response("Student not found", { status: 404 })

  const response = { attended: participant.attended }

  return new Response(JSON.stringify(response), {
    headers: {
      "content-type": "application/json"
    }
  })
}
