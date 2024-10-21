// Next
import { get } from "@vercel/edge-config"

// Auth
import type { User } from "@/functions/user-management"

// Components
import { Button } from "@/components/Button"
import { Comment } from "@/components/Comment"

// Functions
import { getParticipantByEmail } from "@/functions/db/participant"
import { getTeamById } from "@/functions/db/team"

// Styles
import styles from "@/app/console/Console.module.css"
import { getProjectById } from "@/functions/db/project"
import { getJudgeByEmail } from "@/functions/db/judge"

export async function Todos({ user }: { user: User }) {
  const teamDeclarationOpen = await get("teamDeclarationOpen")
  const projectSubmissionOpen = await get("projectSubmissionOpen")
  const peoplesChoiceVoteOpen = await get("peoplesChoiceVoteOpen")

  const isJudge = await getJudgeByEmail(user.email)
  if (isJudge) {
    return (
      <ul className={styles.todos}>
        <li className="fade">
          <Button type="link" destination="/console/evaluate">
            Evaluate a project
          </Button>
        </li>
        <br />
        <li className="back">
          <Button type="link" destination="/">
            Back to DEPLOY/24
          </Button>
        </li>
      </ul>
    )
  }

  const participant = await getParticipantByEmail(user.email)
  const team = await getTeamById(participant?.teamId)
  const hasSubmitted = await getProjectById(team?.project?.id)

  return (
    <ul className={styles.todos}>
      {
        participant
          ?
            <li style={{ color: "var(--color-light-50)" }}>
              You&apos;ve registered        <Comment type="inline">you&apos;re all set to attend</Comment>
            </li>
          :
            <li className="fade">
              <Button type="link" destination="/console/register">
                Register
              </Button>
            </li>
      }

      {
        !teamDeclarationOpen &&
          <li>
            Form your team           <Comment type="inline">opens soon!</Comment>
          </li>
      }
      {
        teamDeclarationOpen && participant && !team &&
          <li className="fade">
            <Button type="link" destination={`/team?participant_email=${user.email}`}>
              Form your team
            </Button>
          </li>
      }
      {
        teamDeclarationOpen && participant && team &&
          <li style={{ color: "var(--color-light-50)" }}>
            You&apos;re on a team         <Comment type="inline">you&apos;re all set to submit</Comment>
          </li>
      }

      {
        !projectSubmissionOpen &&
          <li>
            Submit your project      <Comment type="inline">opens during the event</Comment>
          </li>
      }
      {
        projectSubmissionOpen && participant && team && !hasSubmitted &&
          <li className="fade">
            <Button type="link" destination={`/submit?participant_email=${user.email}&teamname=${team.name}`}>
              Submit your project
            </Button>
          </li>
      }
      {
        projectSubmissionOpen && hasSubmitted &&
          <li style={{ color: "var(--color-light-50)" }}>
            You&apos;ve submitted         <Comment type="inline">you&apos;re ready, good luck!</Comment>
          </li>
      }

      {
        !peoplesChoiceVoteOpen &&
          <li>
            Vote for People&apos;s Choice <Comment type="inline">open after presentations</Comment>
          </li>
      }
      {/* {
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
          <li style={{ color: "var(--color-light-50)" }}>
            You&apos;ve voted             <Comment type="inline">thanks for participating</Comment>
          </li>
      } */}
      <br />
      <li>
        <Button type="link" destination="https://discord.compsigh.club">
          Join the Discord
        </Button>
      </li>
      <br />
      <li className="back">
        <Button type="link" destination="/">
          Back to DEPLOY/24
        </Button>
      </li>
    </ul>
  )
}
