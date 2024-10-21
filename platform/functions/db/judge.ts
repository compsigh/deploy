import prisma from "@/functions/db"

const approvedJudgeEmails = [
  "memre@usfca.edu",
  "jcromwell@usfca.edu"
]

/**
 * Get a judge by email.
 *
 * @export
 * @param {string} email The judge's email.
 */
export async function getJudgeByEmail(email: string) {
  return await prisma.judge.findUnique({
    where: {
      email
    }
  })
}

/**
 * Get all judges.
 *
 * @export
 */
export async function getAllJudges() {
  return await prisma.judge.findMany()
}

/**
 * Create a new judge.
 *
 * @export
 * @param {string} name The judge's name.
 * @param {string} email The judge's email.
 */
export async function createJudge(
  name: string,
  email: string
) {
  if (!approvedJudgeEmails.includes(email))
    return null
  return await prisma.judge.create({
    data: {
      name,
      email
    }
  })
}
