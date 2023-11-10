// Next imports
import { redirect } from 'next/navigation'

// Auth imports
import { getSessionData } from '@/functions/user-management'

// Component imports
import HackerCard from '@/components/HackerCard'
import Todos from '@/components/Todos'

// Style imports
import styles from './Console.module.css'

// Function imports
import { fetchJudge, fetchParticipant, normalizeParticipant } from '@/functions/notion'

export default async function Console () {
  const user = await getSessionData()
  if (!user)
    redirect('/')

  let judge
  let participant
  if (!user.email.endsWith('@dons.usfca.edu')) {
    judge = await fetchJudge(user)
    if (judge)
      user.judge = judge
  }
  else {
    participant = await fetchParticipant(user)
    if (participant) {
      participant = await normalizeParticipant(participant)
      user.participant = participant
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}><span className='fade'>► </span>Welcome, Hacker</h1>

      <Todos user={user} />

      <div className={styles['card-wrapper']}>
        <HackerCard user={user} />
      </div>
    </main>
  )
}
