'use client'

import { signIn } from 'next-auth/react'
import styles from './LogInButton.module.css'

export default function LogInButton ({ callbackUrl }) {
  return (
    <button className={styles.login} onClick={() => signIn('google', { callbackUrl })}>Log in</button>
  )
}
