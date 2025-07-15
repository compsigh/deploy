import prisma from "@/functions/db"

export async function getVoteByParticipantEmail(participantEmail: string) {
  return await prisma.vote.findFirst({
    where: {
      participantEmail
    }
  })
}

export async function getAllVotes() {
  return await prisma.vote.findMany()
}

export async function getProjectVotes(projectId: string) {
  return await prisma.vote.findMany({
    where: {
      projectId
    }
  })
}

export async function createVote(projectId: string, participantEmail: string) {
  return await prisma.vote.create({
    data: {
      projectId,
      participantEmail
    }
  })
}

export async function deleteAllVotes() {
  return await prisma.vote.deleteMany()
}
