// Next
import { get } from '@vercel/edge-config'

// Auth
import { isStudent } from '@/functions/user-management'
import type { User } from 'next-auth'

// Components
import { Button } from '@/components/Button'
import { Comment } from '@/components/Comment'

// Functions
import {
  fetchParticipantNotionPage,
  fetchParticipantTeamNotionPage,
  peoplesChoiceVoteFound,
  submissionFound,
  type TitlePagePropertyType
} from '@/functions/notion'

// Styles
import styles from '@/app/console/Console.module.css'

function isOpen(datetime: Date) {
  const currentDate = new Date()
  if (currentDate >= datetime)
    return true
  else
    return false
}

export async function Todos({ user }: { user: User }) {
  const teamDeclarationOpenDatetime = new Date('2023-11-17T20:00:00-08:00')
  const projectSubmissionOpenDatetime = new Date('2023-11-19T09:00:00-08:00')
  const teamDeclarationOpen = get('teamDeclarationOpen') || isOpen(teamDeclarationOpenDatetime)
  const projectSubmissionOpen = get('projectSubmissionOpen') || isOpen(projectSubmissionOpenDatetime)
  const peoplesChoiceVoteOpen = get('peoplesChoiceVoteOpen') || false

  if (!isStudent(user.email)) {
    return (
      <ul className={styles.todos}>
        <li className="fade">
          <Button
            text="Evaluate a project"
            type="link"
            destination="/evaluate"
            user={user}
          />
        </li>
        <br />
        <li className="back">
          <Button
            text="Back to DEPLOY/23"
            type="link"
            destination="/"
          />
        </li>
      </ul>
    )
  }

  const participant = await fetchParticipantNotionPage(user)
  const team = await fetchParticipantTeamNotionPage(participant)
  const teamNameProperty = team?.properties.Name as TitlePagePropertyType
  const teamName = teamNameProperty.title[0].text.content
  const hasSubmitted = await submissionFound(participant)
  const hasVoted = await peoplesChoiceVoteFound(participant)

  return (
    <ul className={styles.todos}>
      {
        participant
          ?
            <li style={{ color: 'var(--color-light-50)' }}>
              You&apos;ve registered        <Comment type="inline">you&apos;re all set to attend</Comment>
            </li>
          :
            <li className="fade">
              <Button
                text="Register"
                type="link"
                destination="/register"
                user={user}
              />
            </li>
      }

      {
        !teamDeclarationOpen &&
          <li>
            Declare your team        <Comment type="inline">open Friday, Nov. 17 8pm</Comment>
          </li>
      }
      {
        teamDeclarationOpen && participant && !team &&
          <li className="fade">
            <Button
              text="Declare your team"
              type="link"
              destination={`/team?participant_email=${user.email}`}
            />
          </li>
      }
      {
        teamDeclarationOpen && participant && team &&
          <li style={{ color: 'var(--color-light-50)' }}>
            You&apos;re on a team         <Comment type="inline">you&apos;re all set to submit</Comment>
          </li>
      }

      {
        !projectSubmissionOpen &&
          <li>
            Submit your project      <Comment type="inline">open Sunday, Nov. 19 9am</Comment>
          </li>
      }
      {
        projectSubmissionOpen && participant && team && !hasSubmitted &&
          <li className="fade">
            <Button
              text="Submit your project"
              type="link"
              destination={`/submit?participant_email=${user.email}&teamname=${teamName}`}
            />
          </li>
      }
      {
        projectSubmissionOpen && hasSubmitted &&
          <li style={{ color: 'var(--color-light-50)' }}>
            You&apos;ve submitted         <Comment type="inline">you&apos;re ready, good luck!</Comment>
          </li>
      }

      {
        !peoplesChoiceVoteOpen &&
          <li>
            Vote for People&apos;s Choice <Comment type="inline">open after presentations</Comment>
          </li>
      }
      {
        peoplesChoiceVoteOpen && participant && team && !hasVoted &&
          <li className="fade">
            <Button
              text="Vote for People&apos;s Choice"
              type="link"
              destination={`/vote?participant_email=${user.email}&teamname=${teamName}`}
            />
          </li>
      }
      {
        peoplesChoiceVoteOpen && hasVoted &&
          <li style={{ color: 'var(--color-light-50)' }}>
            You&apos;ve voted             <Comment type="inline">thanks for participating</Comment>
          </li>
      }
      <br />
      <li>
        <Button
          text="Discord"
          type="link"
          destination="https://discord.compsigh.so"
        />
      </li>
      <br />
      <li className="back">
        <Button
          text="Back to DEPLOY/23"
          type="link"
          destination="/"
        />
      </li>
    </ul>
  )
}