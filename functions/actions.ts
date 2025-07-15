"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { GraduatingClass, ProjectType } from "@prisma/client"

import {
  checkInParticipant,
  createParticipant,
  getParticipantByEmail
} from "@/functions/db/participant"
import {
  removeParticipantFromTeam,
  updateTeamName
} from "@/functions/db/team"
import {
  acceptInvite,
  cancelInvite,
  declineInvite,
  sendInvite
} from "@/functions/db/invite"
import { createProject, deleteProject } from "@/functions/db/project"
import { createVote, getVoteByParticipantEmail } from "@/functions/db/vote"
import { createEvaluation, deleteEvaluation } from "@/functions/db/evaluation"

function getGraduatingClass(graduatingClassField: string) {
  switch (graduatingClassField) {
    case "2028":
      return GraduatingClass.CO2028
    case "2027":
      return GraduatingClass.CO2027
    case "2026":
      return GraduatingClass.CO2026
    case "2025":
      return GraduatingClass.CO2025
    case "2024":
      return GraduatingClass.CO2024
    case "Masters":
      return GraduatingClass.MASTERS
    default:
      return null
  }
}

function getProjectType(projectTypeField: string) {
  switch (projectTypeField) {
    case "mobile":
      return ProjectType.MOBILE_APP
    case "desktop":
      return ProjectType.DESKTOP_APP
    case "applet":
      return ProjectType.APPLET
    case "game":
      return ProjectType.GAME
    case "webapp":
      return ProjectType.WEB_APP
    case "website":
      return ProjectType.WEBSITE
    case "oss":
      return ProjectType.OPEN_SOURCE_CONTRIBUTION
    case "hardware":
      return ProjectType.HARDWARE
    case "other":
      return ProjectType.OTHER
    default:
      return null
  }
}

export async function registerServerAction(formData: FormData) {
  const nameField = formData.get("name")
  const emailField = formData.get("email")
  const graduatingClassField = formData.get("graduatingClass")
  if (!nameField || !emailField || !graduatingClassField)
    return null

  const name = nameField.toString()
  const email = emailField.toString()
  const graduatingClass = getGraduatingClass(graduatingClassField.toString())
  if (!graduatingClass)
    return null

  const participantExists = await getParticipantByEmail(email)
  if (participantExists)
    return null

  await createParticipant(name, email, graduatingClass)
  redirect("/console")
}

export async function sendInviteServerAction(formData: FormData) {
  const fromField = formData.get("from")
  const toField = formData.get("to")
  if (!fromField || !toField)
    return null

  const from = fromField.toString()
  const to = toField.toString()

  await sendInvite(from, to)
  revalidatePath("/console/team")
}

export async function acceptInviteServerAction(formData: FormData) {
  const idField = formData.get("id")
  if (!idField)
    return null

  const id = idField.toString()

  await acceptInvite(id)
  revalidatePath("/console/team")
}

export async function declineInviteServerAction(formData: FormData) {
  const idField = formData.get("id")
  if (!idField)
    return null

  const id = idField.toString()

  await declineInvite(id)
  revalidatePath("/console/team")
}

export async function cancelInviteServerAction(formData: FormData) {
  const idField = formData.get("id")
  if (!idField)
    return null

  const id = idField.toString()

  await cancelInvite(id)
  revalidatePath("/console/team")
}

export async function leaveTeamServerAction(formData: FormData) {
  const emailField = formData.get("email")
  if (!emailField)
    return null

  const email = emailField.toString()

  const participant = await getParticipantByEmail(email)
  if (!participant)
    return null

  await removeParticipantFromTeam(participant.email)
  revalidatePath("/console/team")
}

export async function updateTeamNameServerAction(formData: FormData) {
  const idField = formData.get("id")
  const nameField = formData.get("name")
  if (!idField || !nameField)
    return null

  const id = idField.toString()
  const name = nameField.toString()

  await updateTeamName(id, name)
  redirect("/console")
}

export async function checkInParticipantServerAction(formData: FormData) {
  const emailField = formData.get("email")
  const attendedField = formData.get("attended")
  if (!emailField || !attendedField)
    return null

  const email = emailField.toString()
  const attended = attendedField.toString() === "true"

  const participant = await getParticipantByEmail(email)
  if (!participant)
    return null

  await checkInParticipant(participant.email, attended)
  revalidatePath("/console/checkin")
}

export async function submitProjectServerAction(formData: FormData) {
  const teamIdField = formData.get("teamId")
  const nameField = formData.get("name")
  const typeField = formData.get("type")
  const linkField = formData.get("link")
  const notesField = formData.get("notes")
  const songField = formData.get("song")

  if (!teamIdField || !nameField || !typeField || !linkField)
    return null

  const teamId = teamIdField.toString()
  const name = nameField.toString()
  const type = getProjectType(typeField.toString())
  if (!type)
    return null
  const link = linkField.toString()
  const notes = notesField?.toString()
  const song = songField?.toString()

  await createProject(teamId, name, type, link, notes, song)
  redirect("/console")
}

export async function deleteProjectServerAction(formData: FormData) {
  const idField = formData.get("id")
  if (!idField)
    return null

  const id = idField.toString()

  await deleteProject(id)
  redirect("/console")
}

export async function evaluateProjectServerAction(formData: FormData) {
  const idField = formData.get("id")
  const judgeNameField = formData.get("judgeName")
  const judgeEmailField = formData.get("judgeEmail")
  const criterion1Field = formData.get("criterion1")
  const criterion2Field = formData.get("criterion2")
  const criterion3Field = formData.get("criterion3")
  const criterion4Field = formData.get("criterion4")
  const criterion5Field = formData.get("criterion5")
  const vibesField = formData.get("vibes")

  if (!idField || !judgeNameField || !judgeEmailField || !criterion1Field || !criterion2Field || !criterion3Field || !criterion4Field || !criterion5Field || !vibesField) {
    return null
  }

  const id = idField.toString()
  const judgeName = judgeNameField.toString()
  const judgeEmail = judgeEmailField.toString()
  const criterion1 = parseFloat(criterion1Field.toString())
  const criterion2 = parseFloat(criterion2Field.toString())
  const criterion3 = parseFloat(criterion3Field.toString())
  const criterion4 = parseFloat(criterion4Field.toString())
  const criterion5 = parseFloat(criterion5Field.toString())
  const vibes = parseFloat(vibesField.toString())

  await createEvaluation(id, judgeName, judgeEmail, criterion1, criterion2, criterion3, criterion4, criterion5, vibes)
  redirect("/console/evaluate")
}

export async function deleteEvaluationServerAction(formData: FormData) {
  const idField = formData.get("id")
  if (!idField)
    return null

  const id = idField.toString()

  await deleteEvaluation(id)
  revalidatePath("/console/evaluations")
}

export async function createVoteServerAction(formData: FormData) {
  const projectIdField = formData.get("projectId")
  const participantEmailField = formData.get("participantEmail")

  if (!projectIdField || !participantEmailField)
    return null

  const projectId = projectIdField.toString()
  const participantEmail = participantEmailField.toString()

  const hasVoted = await getVoteByParticipantEmail(participantEmail)
  if (hasVoted)
    return null

  await createVote(projectId, participantEmail)
  redirect("/console")
}
