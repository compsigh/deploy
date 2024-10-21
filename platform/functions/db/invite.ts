import prisma from "@/functions/db"
import {
  getParticipantByEmail,
  updateParticipantTeam
  } from "@/functions/db/participant"

/**
 * Send an invite from one participant to another.
 *
 * @export
 * @param {string} fromParticipantEmail The email of the participant sending the invite.
 * @param {string} toParticipantEmail The email of the participant receiving the invite.
 */
export async function sendInvite(
  fromParticipantEmail: string,
  toParticipantEmail: string
) {
  // Check if the sender and receiver are the same
  if (fromParticipantEmail === toParticipantEmail)
    return null

  // Check if the sender and receiver are already on the same team
  const fromParticipant = await getParticipantByEmail(fromParticipantEmail)
  const toParticipant = await getParticipantByEmail(toParticipantEmail)
  if (!fromParticipant || !toParticipant)
    return null
  if (fromParticipant.teamId === toParticipant.teamId)
    return null

  // Check if the sender and receiver already have a pending invite between them
  const existingInvite = await prisma.invite.findFirst({
    where: {
      fromParticipantEmail,
      toParticipantEmail
    }
  })
  if (existingInvite)
    return null

  return await prisma.invite.create({
    data: {
      fromParticipantEmail,
      toParticipantEmail
    }
  })
}

/**
 * Get all pending invites a participant has.
 *
 * @export
 * @param {string} toParticipantEmail The participant's email.
 */
export async function getInvitesToEmail(toParticipantEmail: string) {
  return await prisma.invite.findMany({
    where: {
      toParticipantEmail
    }
  })
}

/**
 * Get all pending invites sent by a participant.
 *
 * @export
 * @param {string} fromParticipantEmail The participant's email.
 */
export async function getInvitesFromEmail(fromParticipantEmail: string) {
  return await prisma.invite.findMany({
    where: {
      fromParticipantEmail
    }
  })
}

/**
 * Accept an invite.
 *
 * @export
 * @param {string} id The invite ID.
 */
export async function acceptInvite(id: string) {
  const invite = await prisma.invite.findUnique({
    where: {
      id
    }
  })

  if (!invite)
    return null

  const fromParticipant = await getParticipantByEmail(invite.fromParticipantEmail)
  if (!fromParticipant)
    return null
  const fromParticipantTeamId = fromParticipant.teamId

  const toParticipant = await getParticipantByEmail(invite.toParticipantEmail)
  if (!toParticipant)
    return null

  await prisma.invite.delete({
    where: {
      id
    }
  })

  return await updateParticipantTeam(toParticipant.email, fromParticipantTeamId)
}

/**
 * Decline an invite.
 *
 * @export
 * @param {string} id The invite ID.
 */
export async function declineInvite(id: string) {
  return await prisma.invite.delete({
    where: {
      id
    }
  })
}

/**
 * Cancel an invite. This is the same as declining it.
 *
 * @export
 * @param {string} id The invite ID.
 */
export async function cancelInvite(id: string) {
  return await declineInvite(id)
}
