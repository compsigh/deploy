import type { Session } from 'next-auth'

export function checkAuth(session: Session) {
  if (!session) return false
  const user = session.user
  if (!user.email.endsWith('usfca.edu')) return false
  return true
}

export function isStudent(email: string) {
  if (email.endsWith('dons.usfca.edu')) return true
}
