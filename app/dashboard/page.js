// Next imports
import { redirect } from 'next/navigation'

// Auth imports
import { getSessionData } from '@/functions/user-management'

// Component imports
import Button from '@/components/Button'

// Style imports
import styles from './Dashboard.module.css'

export default async function Dashboard () {
  const user = await getSessionData()
  if (!user)
    redirect('/')

  return (
    <main className={styles.main}>
        <h1 className={styles.title}>Dashboard</h1>
        <h2 className={styles.subtitle}>Things to do, resources, and other bits</h2>
      <ul className={styles.todos}>
        <li><Button text='Register' type='link' destination='/register' user={user} /></li>
        <li>Team Declaration (coming soon)</li>
        <li><Button text='compsigh Discord' type='link' destination='https://discord.compsigh.so' /></li>
        <li><Button text="GitHub's design system for hackathons" type='link' destination='https://www.figma.com/community/file/1144013421600974167' /></li>
        <Button text='Back to DEPLOY/23' type='button' destination='/' />
      </ul>
    </main>
  )
}
