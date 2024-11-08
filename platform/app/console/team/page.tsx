// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Functions
import { get } from "@vercel/edge-config"
import { redirect } from "next/navigation"
import { getTeamById } from "@/functions/db/team"
import {
  acceptInviteServerAction,
  cancelInviteServerAction,
  declineInviteServerAction,
  leaveTeamServerAction,
  sendInviteServerAction,
  updateTeamNameServerAction
} from "@/functions/actions"
import { getParticipantByEmail } from "@/functions/db/participant"
import { getInvitesFromEmail, getInvitesToEmail } from "@/functions/db/invite"

// Components
import Link from "next/link"
import { Spacer } from "@/components/Spacer"
import { PlayH1 } from "@/components/PlayH1"
import { Button } from "@/components/Button"

// Types
import { type Participant } from "@prisma/client"

// Styles
import styles from "@/app/console/Page.module.css"
import teamPageStyles from "@/app/console/team/Team.module.css"

async function getParticipantName(email: string) {
  const participant = await getParticipantByEmail(email)
  if (!participant)
    return null
  return participant.name
}

async function TeamView({ participant }: { participant: Participant }) {
  const team = await getTeamById(participant.teamId)
  if (!team)
    throw new Error("Participant has no team")
  const participants = team.participants

  return (
    <>
      <h3 className={styles.heading}>Your team: {team.name}</h3>
      <ul>
        {participants.map(participant => (
          <li key={participant.email}>{participant.name}</li>
        ))}
      </ul>
      {
        participants.length > 1
          &&
            <div className={teamPageStyles["form-buttons-wrapper"]}>
              <form action={leaveTeamServerAction}>
                <input type="hidden" name="email" value={participant.email} />
                <Button type="submit" style="secondary">Leave team</Button>
              </form>
            </div>
      }
      <p>You can update your team&apos;s name if you&apos;d like:</p>
      <Spacer size={8} />
      <div className={teamPageStyles["form-buttons-wrapper"]}>
        <form action={updateTeamNameServerAction}>
          <input type="hidden" name="id" value={team.id} />
          <input
            type="text"
            name="name"
            placeholder={`${participant.name.split(" ")[0]}'s team`}
            maxLength={18}
          />
          <Spacer size={24} />
          <Button type="submit" style="secondary">Update team name</Button>
        </form>
      </div>
      <Spacer size={32} />
    </>
  )
}

async function IncomingInviteList({ participant }: { participant: Participant }) {
  const incomingInvites = await getInvitesToEmail(participant.email)
  if (incomingInvites.length === 0)
    return <></>

  return (
    <>
      <h3 className={styles.heading}>Incoming invites</h3>
      <ul>
        {incomingInvites.map(invite => (
          <li key={invite.id}>
            <p>{getParticipantName(invite.fromParticipantEmail)}</p>
            <Spacer size={8} />
            <div className={teamPageStyles["form-buttons-wrapper"]}>
              <form action={acceptInviteServerAction}>
                <input type="hidden" name="id" value={invite.id} />
                <Button type="submit" style="secondary">Accept</Button>
              </form>
              <form action={declineInviteServerAction}>
                <input type="hidden" name="id" value={invite.id} />
                <Button type="submit" style="secondary">Decline</Button>
              </form>
            </div>
            <Spacer size={32} />
          </li>
        ))}
      </ul>
    </>
  )
}

async function OutgoingInviteList({ participant }: { participant: Participant }) {
  const outgoingInvites = await getInvitesFromEmail(participant.email)
  if (outgoingInvites.length === 0)
    return <></>

  return (
    <>
      <h3 className={styles.heading}>Outgoing invites</h3>
      <ul>
        {outgoingInvites.map(invite => (
          <li key={invite.id}>
            <p>{getParticipantName(invite.toParticipantEmail)}</p>
            <Spacer size={8} />
            <div className={teamPageStyles["form-buttons-wrapper"]}>
              <form action={cancelInviteServerAction}>
                <input type="hidden" name="id" value={invite.id} />
                <Button type="submit" style="secondary">Cancel</Button>
              </form>
            </div>
            <Spacer size={32} />
          </li>
        ))}
      </ul>
    </>
  )
}

async function InviteForm({ participant }: { participant: Participant }) {
  const invitesSent = await getInvitesFromEmail(participant.email)
  const team = await getTeamById(participant.teamId)
  if (!team)
    throw new Error("Participant has no team")
  const teamSize = team.participants.length

  if (invitesSent.length >= 3) {
    return (
      <>
        <p style={{
          border: "1px solid var(--color-light)",
          padding: "8px 16px"
        }}>
          You can have a maximum of 3 active invites; you&apos;ll have to cancel one to send a new one.
        </p>
      </>
    )
  }

  if (teamSize >= 4) {
    return (
      <>
        <p style={{
          border: "1px solid var(--color-light)",
          padding: "8px 16px"
        }}>
          You&apos;ve reached the maximum of 4 participants on your team.
        </p>
      </>
    )
  }

  return (
    <>
      <div className={teamPageStyles["form-buttons-wrapper"]}>
        <form action={sendInviteServerAction}>
          <input type="hidden" name="from" value={participant.email} />
          <input type="email" name="to" placeholder="USF email address" />
          <Spacer size={24} />
          <Button type="submit" style="secondary">Send invite</Button>
        </form>
      </div>
    </>
  )
}

export default async function TeamFormation() {
  const session = await auth()
  if (!session)
    redirect("/")

  const authed = checkAuth(session)
  if (!authed)
    redirect("/console/unauthorized")
  const user = authed

  const registered = await getParticipantByEmail(user.email)
  if (!registered)
    redirect("/console")
  const participant = registered

  const teamFormationOpen = await get("teamFormationOpen")
  if (!teamFormationOpen)
    redirect("/console")

  return (
    <>
      <main className={`${styles.main} ${teamPageStyles.main}`}>
        <PlayH1>Welcome, Hacker</PlayH1>
        <h2 className={styles.heading}>Team Formation</h2>
        <ul>
          <li className="back">
            <Link href="/console">Back to Console</Link>
          </li>
        </ul>
        <TeamView participant={participant} />
        <IncomingInviteList participant={participant} />
        <OutgoingInviteList participant={participant} />
        <h3 className={styles.heading}>Invites</h3>
        <p>Invite a friend to join your team!</p>
        <p><em>Please make sure your friend has also registered.</em></p>
        <p>Be sure to enter their email exactly as it appears on their USF Google account. <em>Note: this won&apos;t send them an email; just ask them to refresh this page on their end.</em></p>
        <Spacer size={32} />
        <InviteForm participant={participant} />
      </main>
    </>
  )
}
