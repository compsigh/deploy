// Next
import Link from "next/link"
import { get } from "@vercel/edge-config"

// Auth
import { isJudge, isOrganizer, type User } from "@/functions/user-management"

// Components
import { Comment } from "@/components/Comment"

// Functions
import { getTeamById } from "@/functions/db/team"
import { getProjectById } from "@/functions/db/project"
import { getVoteByParticipantEmail } from "@/functions/db/vote"
import { getParticipantByEmail } from "@/functions/db/participant"

export async function Todos({ user }: { user: User }) {
  const registrationOpen = await get("registrationOpen")
  const teamFormationOpen = await get("teamFormationOpen")
  const projectSubmissionOpen = await get("projectSubmissionOpen")
  const peoplesChoiceVoteOpen = await get("peoplesChoiceVoteOpen")

  const judge = isJudge(user)
  if (judge) {
    return (
      <>
        <ul>
          <li className="fade">
            <Link href="/console/evaluate">Evaluate a project</Link>
          </li>
          <li>
            <Link href="/console/participants">View all participants</Link>
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
  const hasVoted = await getVoteByParticipantEmail(user.email)

  return (
    <>
      <ul>
        {
          participant
            &&
              <li style={{ color: "var(--color-light-50)" }}>
                You&apos;ve registered        <Comment type="inline">you&apos;re all set to attend</Comment>
              </li>
        }
        {
          !participant && registrationOpen
            &&
              <li className="fade">
                <Link href="/console/register">Register</Link>
              </li>
        }
        {
          !participant && !registrationOpen
            &&
              <li style={{ color: "var(--color-light-50)" }}>
                Registration closed      <Comment type="inline">let us know if there&apos;s an issue</Comment>
              </li>
        }

        {
          teamFormationOpen && participant
            &&
              <li className="fade">
                <Link href="/console/team">Form your team</Link>
              </li>
        }
        {
          !teamFormationOpen
            &&
              <li style={{ color: "var(--color-light-50)" }}>
                Team formation closed    <Comment type="inline">let us know if there&apos;s an issue</Comment>
              </li>
        }

        {
          !projectSubmissionOpen
            &&
              <li>
                Submit your project      <Comment type="inline">opens during the event</Comment>
              </li>
        }
        {
          projectSubmissionOpen && participant && team && !hasSubmitted
            &&
              <li className="fade">
                <Link href="/console/submit">Submit your project</Link>
              </li>
        }
        {
          projectSubmissionOpen && hasSubmitted
            &&
              <li style={{ color: "var(--color-light-50)" }}>
                You&apos;ve submitted         <Comment type="inline">you&apos;re ready, good luck!</Comment>
              </li>
        }

        {
          !peoplesChoiceVoteOpen
            &&
              <li>
                Vote for People&apos;s Choice <Comment type="inline">open after presentations</Comment>
              </li>
        }
        {
          peoplesChoiceVoteOpen && participant && team && !hasVoted &&
            <li className="fade">
              <Link href="/console/vote">Vote for People&apos;s Choice</Link>
            </li>
        }
        {
          peoplesChoiceVoteOpen && hasVoted &&
            <li style={{ color: "var(--color-light-50)" }}>
              You&apos;ve voted             <Comment type="inline">thanks for participating</Comment>
            </li>
        }
      </ul>

      {
        isOrganizer(user)
          &&
            <ul>
              <li>
                <Link href="/console/participants">View all participants</Link>
              </li>
              <li>
                <Link href="/console/checkin">Check in participants</Link>
              </li>
              <li>
                <Link href="/console/teams">View participant teams</Link>
              </li>
              <li>
                <Link href="/console/projects">View submitted projects</Link>
              </li>
              <li>
                <Link href="/console/evaluations">View project evaluations</Link>
              </li>
              <li>
                <Link href="/console/votes">View People&apos;s Choice votes</Link>
              </li>
            </ul>
      }

      <ul>
        <li>
          <Link href="https://calndr.link/event/HPLPX7Si10">Add to calendar</Link>
        </li>
        <li>
          <Link href="/console/attendees">See who&apos;s going</Link>
        </li>
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
