'use client'

import { signIn, signOut } from 'next-auth/react'
import styles from './Button.module.css'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Button (props) {
  const { text, type, user, destination } = props
  const router = useRouter()
  let onClick
  let queryParams = ''

  const searchParams = useSearchParams()
  const object = {}
  for (const [key, value] of searchParams.entries())
    object[key] = value
  queryParams = appendQueryParams(queryParams, object)

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

  if (type === 'copy')
    return <Link href='#' onClick={() => navigator.clipboard.writeText(`${destination}`)}>{text}</Link>

  if (type === 'link')
    return <Link href={`${destination}${queryParams}`}>{text}</Link>

  if (type === 'button')
    return <button className={styles.button} onClick={onClick}>{text}</button>

  return (
    <button className={styles.button} onClick={onClick}>{text}</button>
  )
}

function appendQueryParams (queryParams, object) {
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
