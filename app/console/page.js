// Next imports
import { redirect } from 'next/navigation'

// Auth imports
import { getSessionData } from '@/functions/user-management'

// Component imports
import Button from '@/components/Button'

// Style imports
import styles from './Console.module.css'
import HackerCard from '@/components/HackerCard'

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

      <ul className={styles.todos}>
        {
          participant
            ? <li style={{ color: '#888888' }}>You&apos;ve registered — you&apos;re all set to attend</li>
            : <li className='fade'><Button text='Register' type='link' destination='/register' user={user} /></li>
        }
        <li>Declare your team   <p className='comment'>opens Friday, Nov. 17</p></li>
        <li>Submit your project <p className='comment'>opens Sunday, Nov. 19</p></li>
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
