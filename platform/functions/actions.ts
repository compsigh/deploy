"use server"

import { createParticipant, getParticipantByEmail } from "@/functions/db/participant"
import { GraduatingClass } from "@prisma/client"
import { redirect } from "next/navigation"

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
