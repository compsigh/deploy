// Next imports
import { redirect } from 'next/navigation'

// Auth imports
import { getSessionData } from '@/functions/user-management'

export default async function Dashboard () {
  const user = await getSessionData()
  if (!user)
    redirect('/')

  return (
    <>
      <h1>Authenticated as:</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </>
  )
}
