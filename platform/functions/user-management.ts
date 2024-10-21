import { type Session } from 'next-auth'

export function checkAuth(session: Session | null) {
  if (!session?.user?.email?.endsWith('usfca.edu'))
    return false
  return session.user
}

export function isStudent(email: string) {
  if (email.endsWith('dons.usfca.edu'))
    return true
}
