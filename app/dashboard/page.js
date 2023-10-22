// Next imports
import { redirect } from 'next/navigation'

// Auth imports
import { getSessionData } from '@/functions/user-management'

// Component imports
import Button from '@/components/Button'

// Style imports
import styles from './Dashboard.module.css'
import HackerCard from '@/components/HackerCard'

export default async function Dashboard () {
  const user = await getSessionData()
  if (!user)
    redirect('/')

  return (
    <main className={styles.main}>
      <h1 className={styles.title}><span className='playbutton'>► </span>Welcome, Hacker</h1>

      <ul className={styles.todos}>
        <li><Button text='Register' type='link' destination='/register' user={user} /></li>
        <li>Declare your team (coming soon)</li>
        <li>Submit your project (coming soon)</li>
        <br />
        <li><Button text='Discord' type='link' destination='https://discord.compsigh.so' /></li>
        <br />
        <li className='back'><Button text='Back to DEPLOY/23' type='link' destination='/' /></li>
      </ul>

      <div className={styles['card-wrapper']}>
        <HackerCard user={user} />
      </div>
    </main>
  )
}
