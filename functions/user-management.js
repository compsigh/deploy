import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function getSessionData () {
  const session = await getServerSession(authOptions)
  if (!session) return null
  const sessionData = session.user
  return sessionData
}
