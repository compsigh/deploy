'use client'

// Next
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { MouseEventHandler } from 'react'

// Auth
import { signIn, signOut } from 'next-auth/react'
import type { User } from 'next-auth'

// Styles
import styles from './Button.module.css'

function appendQueryParams(queryParams: string, object: Object) {
  if (Object.keys(object).length === 0)
    return queryParams

  if (queryParams === '')
    queryParams += '?'
  else
    queryParams += '&'

  for (const [key, value] of Object.entries(object)) {
    queryParams += `${key}=${value}`
    if (key !== Object.keys(object)[Object.keys(object).length - 1])
      queryParams += '&'
  }

  return queryParams
}

export function Button({
  text,
  type,
  user,
  destination
}: {
  text: string
  type: string
  user?: User
  destination?: string
}) {
  let queryParams = ''
  const searchParams = useSearchParams()
  const object = {}
  for (const [key, value] of searchParams.entries())
    object[key] = value
  queryParams = appendQueryParams(queryParams, object)

  let onClick: MouseEventHandler<HTMLButtonElement>
  const router = useRouter()
  if (type === 'login')
    onClick = () => signIn('google', { callbackUrl: `/console${queryParams}` })
  else if (type === 'logout')
    onClick = () => signOut()
  else if (type === 'button' && destination)
    onClick = () => router.push(`${destination}${queryParams}`)

  if (user) {
    const firstName = user.name.split(' ')[0]
    const lastName = user.name.split(' ')[1]
    const email = user.email

    const object = { firstName, lastName, email }
    queryParams = appendQueryParams(queryParams, object)
  }

  if (type === 'copy') {
    return (
      <Link
        href="#"
        onClick={() => navigator.clipboard.writeText(`${destination}`)}
      >
        {text}
      </Link>
    )
  }

  if (type === 'link')
    return <Link href={`${destination}${queryParams}`}>{text}</Link>

  if (type === 'button') {
    return (
      <button className={styles.button} onClick={onClick}>
        {text}
      </button>
    )
  }

  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  )
}

