// Next imports
import { get } from '@vercel/edge-config'

// Component imports
import Button from '@/components/Button'

// Style imports
import styles from '@/app/console/Console.module.css'

export async function Todos ({ user }) {
  const teamDeclarationOpenDatetime = new Date('2023-11-17T20:00:00-08:00')
  const projectSubmissionOpenDatetime = new Date('2023-11-19T09:00:00-08:00')
  const teamDeclarationOpen = get('teamDeclarationOpen') || isOpen(teamDeclarationOpenDatetime)
  const projectSubmissionOpen = get('projectSubmissionOpen') || isOpen(projectSubmissionOpenDatetime)
  const peoplesChoiceVoteOpen = get('peoplesChoiceVoteOpen') || false

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
          ? <li style={{ color: '#888888' }}>You&apos;ve registered        <p className='comment'>you&apos;re all set to attend</p></li>
          : <li className='fade'><Button text='Register' type='link' destination='/register' user={user} /></li>
      }

      {
        !teamDeclarationOpen &&
            <li>Declare your team        <p className='comment'>open Friday, Nov. 17 8pm</p></li>
      }
      {
        teamDeclarationOpen && user.participant && !user.participant?.teamName &&
            <li className='fade'><Button text='Declare your team' type='link' destination={`/team?participant_email=${user.email}`} /></li>
      }
      {
        teamDeclarationOpen && user.participant?.teamName &&
            <li style={{ color: '#888888' }}>You&apos;re on a team         <p className='comment'>you&apos;re all set to submit</p></li>
      }

      {
        !projectSubmissionOpen &&
            <li>Submit your project      <p className='comment'>open Sunday, Nov. 19 9am</p></li>
      }
      {
        projectSubmissionOpen && user.participant && user.participant?.teamName && !user.participant?.submitted &&
            <li className='fade'><Button text='Submit your project' type='link' destination={`/submit?participant_email=${user.email}&teamname=${user.participant?.teamName}`} /></li>
      }
      {
        projectSubmissionOpen && user.participant?.submitted &&
            <li style={{ color: '#888888' }}>You&apos;ve submitted         <p className='comment'>you&apos;re ready, good luck!</p></li>
      }

      {
        !peoplesChoiceVoteOpen &&
            <li>Vote for People&apos;s Choice <p className='comment'>open after presentations</p></li>
      }
      {
        peoplesChoiceVoteOpen && user.participant && user.participant?.teamName && !user.participant?.voted &&
            <li className='fade'><Button text='Vote for People&apos;s Choice' type='link' destination={`/vote?participant_email=${user.email}&teamname=${user.participant?.teamName}`} /></li>
      }
      {
        peoplesChoiceVoteOpen && user.participant?.voted &&
            <li style={{ color: '#888888' }}>You&apos;ve voted             <p className='comment'>thanks for participating</p></li>
      }
      <br />
      <li><Button text='Discord' type='link' destination='https://discord.compsigh.so' /></li>
      <br />
      <li className='back'><Button text='Back to DEPLOY/23' type='link' destination='/' /></li>
    </ul>
  )
}

function isOpen (datetime) {
  const currentDate = new Date()
  if (currentDate >= datetime)
    return true
  else
    return false
}
