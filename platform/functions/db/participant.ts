import prisma from "@/functions/db"
import {
  deleteTeam,
  getTeamById,
  removeParticipantFromTeam
  } from "@/functions/db/team"
import { type GraduatingClass } from "@prisma/client"

/**
 * Get a participant by email.
 *
 * @export
 * @param {string} email The participant's email.
 */
export async function getParticipantByEmail(email: string) {
  return await prisma.participant.findUnique({
    where: {
      email
    }
  })
}

/**
 * Get all participants.
 *
 * @export
 */
export async function getAllParticipants() {
  return await prisma.participant.findMany()
}

/**
 * Create a new participant.
 *
 * @export
 * @param {string} name The participant's name.
 * @param {string} email The participant's email.
 * @param {GraduatingClass} graduatingClass The participant's graduating class.
 */
export async function createParticipant(
  name: string,
  email: string,
  graduatingClass: GraduatingClass
) {
  return await prisma.participant.create({
    data: {
      name,
      email,
      graduatingClass,
      team: {
        create: {}
      }
    }
  })
}

/**
 * Update a participant's team.
 *
 * @export
 * @param {string} email The participant's email.
 * @param {string} newTeamId The new team ID.
 */
export async function updateParticipantTeam(
  email: string,
  newTeamId: string
) {
  const participant = await getParticipantByEmail(email)

  if (!participant)
    return null

  const formerTeam = await getTeamById(participant.teamId)

  if (!formerTeam)
    return null

  if (formerTeam.id === newTeamId)
    return null

  // Set new team's participants to include participant
  await prisma.team.update({
    where: {
      id: newTeamId
    },
    data: {
      participants: {
        connect: {
          email
        }
      }
    }
  })

  // Remove the participant from their former team
  const otherParticipants = formerTeam.participants.filter(
    participant => participant.email !== email
  )

  await prisma.team.update({
    where: {
      id: formerTeam.id
    },
    data: {
      participants: {
        set: otherParticipants
      }
    }
  })

  // Clean up former team if it has no participants other than the one removed
  if (formerTeam.participants.length === 1)
    await deleteTeam(formerTeam.id)

  return await getParticipantByEmail(email)
}

/**
 * Remove a participant from the event.
 *
 * @export
 * @param {string} email The participant's email.
 */
export async function deleteParticipant(email: string) {
  const participant = await getParticipantByEmail(email)

  if (!participant)
    return null

  await removeParticipantFromTeam(email)

  const deletedParticipant = await prisma.participant.delete({
    where: {
      email
    }
  })

  // If the participant is the only one in their team, delete the team
  const team = await prisma.participant.findMany({
    where: {
      teamId: deletedParticipant.teamId
    }})

  if (team.length === 0)
    await deleteTeam(deletedParticipant.teamId)

  return deletedParticipant
}
