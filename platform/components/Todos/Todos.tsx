// Next
import Link from "next/link"
import { get } from "@vercel/edge-config"

// Auth
import type { User } from "@/functions/user-management"

// Components
import { Comment } from "@/components/Comment"

// Functions
import { getTeamById } from "@/functions/db/team"
import { getJudgeByEmail } from "@/functions/db/judge"
import { getProjectById } from "@/functions/db/project"
import { getParticipantByEmail } from "@/functions/db/participant"

export async function Todos({ user }: { user: User }) {
  const teamDeclarationOpen = await get("teamDeclarationOpen")
  const projectSubmissionOpen = await get("projectSubmissionOpen")
  const peoplesChoiceVoteOpen = await get("peoplesChoiceVoteOpen")

  const isJudge = await getJudgeByEmail(user.email)
  if (isJudge) {
    return (
      <>
        <ul>
          <li className="fade">
            <Link href="/console/evaluate">Evaluate a project</Link>
          </li>
        </ul>
        <ul>
          <li className="back">
            <Link href="/">Back to DEPLOY/24</Link>
          </li>
        </ul>
      </>
    )
  }

  const participant = await getParticipantByEmail(user.email)
  const team = await getTeamById(participant?.teamId)
  const hasSubmitted = await getProjectById(team?.project?.id)

  return (
    <>
      <ul>
        {
          participant
            ?
              <li style={{ color: "var(--color-light-50)" }}>
                You&apos;ve registered        <Comment type="inline">you&apos;re all set to attend</Comment>
              </li>
            :
              <li className="fade">
                <Link href="/console/register">Register</Link>
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
              <Link href="/team">Form your team</Link>
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
              <Link href="/console/submit">Submit your project</Link>
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
      </ul>
      <ul>
        <li>
          <Link href="https://discord.compsigh.club">Join the Discord</Link>
        </li>
        <li className="back">
          <Link href="/">Back to DEPLOY/24</Link>
        </li>
      </ul>
    </>
  )
}
