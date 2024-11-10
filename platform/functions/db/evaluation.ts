import prisma from "@/functions/db"

/**
 * Get an evaluation by ID.
 *
 * @export
 * @param {string} id The evaluation ID.
 */
export async function getEvaluationById(id: string) {
  return await prisma.evaluation.findUnique({
    where: {
      id
    }
  })
}

/**
 * Get all evaluations.
 *
 * @export
 */
export async function getAllEvaluations() {
  return await prisma.evaluation.findMany()
}

/**
 * Get all evaluations for a project.
 *
 * @export
 * @param {string} projectId The project ID.
 */
export async function getEvaluationsByProjectId(projectId: string) {
  return await prisma.evaluation.findMany({
    where: {
      projectId
    }
  })
}

/**
 * Create a new evaluation.
 *
 * @export
 * @param {string} projectId The ID of the project to associate the evaluation with.
 * @param {string} judgeName The judge's name.
 * @param {string} judgeEmail The judge's email.
 * @param {number} criterion1 The score for criterion 1.
 * @param {number} criterion2 The score for criterion 2.
 * @param {number} criterion3 The score for criterion 3.
 * @param {number} criterion4 The score for criterion 4.
 * @param {number} criterion5 The score for criterion 5.
 * @param {number} vibes The vibes score.
 */
export async function createEvaluation(
  projectId: string,
  judgeName: string,
  judgeEmail: string,
  criterion1: number,
  criterion2: number,
  criterion3: number,
  criterion4: number,
  criterion5: number,
  vibes: number
) {
  const evaluation = await prisma.evaluation.create({
    data: {
      projectId,
      judgeName,
      judgeEmail,
      criterion1,
      criterion2,
      criterion3,
      criterion4,
      criterion5,
      vibes
    }
  })
  return await prisma.project.update({
    where: {
      id: projectId
    },
    data: {
      evaluations: {
        connect: {
          id: evaluation.id
        }
      }
    }
  })
}

/**
 * Delete an evaluation by ID.
 *
 * @export
 * @param {string} id The evaluation ID.
 */
export async function deleteEvaluation(id: string) {
  return await prisma.evaluation.delete({
    where: {
      id
    }
  })
}
