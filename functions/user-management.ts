import { type Session } from "next-auth"

export type User = {
  name: string
  email: string
}

/**
 * Checks if the current session's user is an authenticated USF account.
 * Returns a guaranteed `User` object if so, `false` otherwise.
 *
 * @export
 * @param {Session} session The current NextAuth session.
 */
export function checkAuth(session: Session | null): User | false {
  if (!session)
    return false
  const { user } = session
  if (!user)
    return false
  if (!user.email || !user.name)
    return false
  if (!user.email.endsWith("usfca.edu"))
    return false
  return {
    name: user.name,
    email: user.email
  }
}

/**
 * Checks if the current user is an organizer.
 *
 * @export
 * @param {User} user The `User` object to check.
 */
export function isOrganizer(user: User) {
  if (process.env.ORGANIZERS?.includes(user.email))
    return true
  return false
}

/**
 * Checks if the current user is a judge.
 *
 * @export
 * @param {User} user The `User` object to check.
 */
export function isJudge(user: User) {
  if (process.env.JUDGES?.includes(user.email))
    return true
  return false
}
