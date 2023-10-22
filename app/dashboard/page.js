// Next imports
import { redirect } from 'next/navigation'

// Auth imports
import { getSessionData } from '@/functions/user-management'

// Component imports
import Button from '@/components/Button'

// Style imports
import styles from './Dashboard.module.css'
import HackerCard from '@/components/HackerCard'

// SDK imports
import { Client } from '@notionhq/client'

export default async function Dashboard () {
  const user = await getSessionData()
  if (!user)
    redirect('/')
  const participant = await fetchParticipant(user)
  if (participant)
    user.participant = participant

  return (
    <main className={styles.main}>
      <h1 className={styles.title}><span className='playbutton'>► </span>Welcome, Hacker</h1>

      <ul className={styles.todos}>
        {
          participant
            ? <li style={{ color: '#888888' }}>You&apos;ve registered — you&apos;re all set to attend</li>
            : <li><Button text='Register' type='link' destination='/register' user={user} /></li>
        }
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

async function fetchParticipant (user) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  let response = await notion.databases.query({
    database_id: process.env.NOTION_PARTICIPANTS_DATABASE_ID
  })
  const participants = response.results

  let hasMore = response.has_more
  while (hasMore) {
    response = await notion.databases.query({
      database_id: process.env.NOTION_PARTICIPANTS_DATABASE_ID,
      start_cursor: response.next_cursor
    })
    participants.push(...response.results)
    hasMore = response.has_more
  }

  for (const participant of participants)
    if (participant.properties.Email.title[0].text.content === user.email)
      return participant
}
