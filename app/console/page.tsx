// Next
import { redirect } from 'next/navigation'

// Auth
import { auth } from '@/auth'
import { checkAuth } from '@/functions/user-management'

// Components
import { HackerCard } from '@/components/HackerCard'
import { Todos } from '@/components/Todos'

// Styles
import styles from './Console.module.css'

export default async function Console () {
  const session = await auth()
  const authed = await checkAuth(session)
  if (!authed)
    redirect('/')

  return (
    <main className={styles.main}>
      <h1 className={styles.title}><span className='fade'>► </span>Welcome, Hacker</h1>
      <Todos />
      <div className={styles['card-wrapper']}>
        <HackerCard />
      </div>
    </main>
  )
}
