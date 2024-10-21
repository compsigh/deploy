import prisma from "@/functions/db"
import { ProjectType } from "@prisma/client"

/**
 * Get a project by ID.
 *
 * @export
 * @param {string} id The project ID.
 */
export async function getProjectById(id: string | undefined) {
  if (!id)
    return null
  return await prisma.project.findUnique({
    where: {
      id
    }
  })
}

/**
 * Get all projects.
 *
 * @export
 */
export async function getAllProjects() {
  return await prisma.project.findMany()
}

/**
 * Create a new project.
 *
 * @export
 * @param {string} teamId The ID of the team to associate the project with.
 * @param {string} name The project name.
 * @param {ProjectType} type The project type.
 * @param {string} link A public link for judges.
 * @param {string} [notes] Any additional notes for judges and/or organizers.
 * @param {string} [song] The team's requested song to walk out to.
 */
export async function createProject(
  teamId: string,
  name: string,
  type: ProjectType,
  link: string,
  notes?: string,
  song?: string
) {
  const project = await prisma.project.create({
    data: {
      teamId,
      name,
      type,
      link,
      notes,
      song
    }
  })

  await prisma.team.update({
    where: {
      id: teamId
    },
    data: {
      project: {
        connect: {
          id: teamId
        }
      }
    }
  })

  return project
}
