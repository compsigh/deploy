'use client'

import { useRouter } from 'next/navigation'

export default function NamedRedirect ({ user }) {
  console.log(user)
  const router = useRouter()
  if (!user)
    router.push('/')
  const firstName = user.name.split(' ')[0]
  const lastName = user.name.split(' ')[1]
  const email = user.email
  router.replace(`/dashboard?firstName=${firstName}&lastName=${lastName}&email=${email}`)
}
