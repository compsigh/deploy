import prisma from "@/functions/db"
import { getParticipantByEmail } from "@/functions/db/participant"

/**
 * Get a team by ID.
 *
 * @export
 * @param {string} id The team ID.
 */
export async function getTeamById(id: string | undefined) {
  if (!id)
    return null
  return await prisma.team.findUnique({
    where: {
      id
    },
    include: {
      participants: true,
      project: true
    }
  })
}

/**
 * Get all teams.
 *
 * @export
 */
export async function getAllTeams() {
  return await prisma.team.findMany({
    include: {
      participants: true,
      project: true
    }
  })
}

/**
 * Rename a team.
 *
 * @export
 * @param {string} id The team ID.
 * @param {string} name The new team name.
 */
export async function updateTeamName(id: string, name: string) {
  return await prisma.team.update({
    where: {
      id
    },
    data: {
      name
    }
  })
}

/**
 * Delete a team and reset its participants to their own solo teams.
 *
 * @export
 */
export async function deleteTeam(id: string) {
  return await prisma.team.delete({
    where: {
      id
    }
  })
}

/**
 * Remove a participant from their team and reset them to their own solo team.
 *
 * @export
 * @param {string} email The participant's email.
 */
export async function removeParticipantFromTeam(email: string) {
  const participant = await getParticipantByEmail(email)
  if (!participant)
    return null

  const currentTeam = await getTeamById(participant.teamId)
  if (!currentTeam)
    return null

  // Create a new solo team for the participant
  await prisma.team.create({
    data: {
      participants: {
        connect: {
          email
        }
      }
    }
  })

  // Remove the participant from their former team
  const otherParticipants = currentTeam.participants.filter(
    participant => participant.email !== email
  )

  const updatedTeam = await prisma.team.update({
    where: {
      id: currentTeam.id
    },
    data: {
      participants: {
        set: otherParticipants
      }
    }
  })

  // Clean up former team if it has no participants other than the one removed
  if (currentTeam.participants.length === 1)
    await deleteTeam(currentTeam.id)

  return updatedTeam
}
