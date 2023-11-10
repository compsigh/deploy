// Component imports
import Button from '@/components/Button'

// Style imports
import styles from '@/app/console/Console.module.css'

export default async function Todos ({ user }) {
  if (user.judge)
    return (
      <ul className={styles.todos}>
        <li className='fade'><Button text='Evaluate a project' type='link' destination='/evaluate' user={user} /></li>
        <br />
        <li className='back'><Button text='Back to DEPLOY/23' type='link' destination='/' /></li>
      </ul>
    )

  return (
    <ul className={styles.todos}>
      {
        user.participant
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
  )
}
