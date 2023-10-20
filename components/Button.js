'use client'

import { signIn, signOut } from 'next-auth/react'
import styles from './Button.module.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Button (props) {
  const { text, type, user, destination } = props
  const router = useRouter()
  let onClick
  let queryParams = ''

  if (type === 'login')
    onClick = () => signIn('google', { callbackUrl: '/dashboard' })
  else if (type === 'logout')
    onClick = () => signOut()
  else if (type === 'button' && destination)
    onClick = () => router.push(`${destination}${queryParams}`)

  if (user) {
    const firstName = user.name.split(' ')[0]
    const lastName = user.name.split(' ')[1]
    const email = user.email
    queryParams = `?firstName=${firstName}&lastName=${lastName}&email=${email}`
  }

  if (type === 'link')
    return <Link href={`${destination}${queryParams}`}>{text}</Link>

  if (type === 'button')
    return <button className={styles.button} onClick={onClick}>{text}</button>

  return (
    <button className={styles.button} onClick={onClick}>{text}</button>
  )
}
