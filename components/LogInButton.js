'use client'

import { signIn } from 'next-auth/react'
import styles from './LogInButton.module.css'

export default function LogInButton () {
  return (
    <button className={styles.login} onClick={() => signIn()}>Log in</button>
  )
}
