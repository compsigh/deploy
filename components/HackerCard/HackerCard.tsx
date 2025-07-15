import { isJudge, type User } from "@/functions/user-management"
import { getTeamById } from "@/functions/db/team"
import { getParticipantByEmail } from "@/functions/db/participant"

import styles from "./HackerCard.module.css"

export async function HackerCard({ user }: { user: User }) {
  const judge = isJudge(user)
  const participant = await getParticipantByEmail(user.email)
  if (!judge && !participant)
    return null
  const name = user.name
  const team = await getTeamById(participant?.teamId)
  const teamName = (judge && "Judges") || team?.name || `${name.split(" ")[0]}'s Team`
  const teammates = (judge &&
                      ["Greg Benson", "Paul Haskell", "Chris Brooks", "Phil Peterson", "Mehmet Emre", "John Cromwell", "Edward Shturman"]
                      .filter(judgeName => judgeName !== name)
                      .map(judgeName => ({ name: judgeName })))
                  || team?.participants.filter(participant => participant.email !== user.email)

  return (
    <>
      <div className={styles.card}>
        <div className={styles.id}>
          <p className={styles.number}>{"►/24"}</p>
        </div>

        <h3 className={styles.name}>{name}</h3>

        <div className={styles["team-bar"]}>
          {
            teamName
              ? <h3 className={styles["team-name"]}>{teamName}</h3>
              : <h3 className={styles["team-name"]}>Team TBD</h3>
          }
        </div>

        <ul className={styles.teammates}>
          <li key={participant?.email}>
            {participant?.name}
          </li>
          {
            teammates && teammates.length > 0
              ?
                teammates.map(teammate => (
                  <li key={teammate.name}>
                    {teammate.name}
                  </li>
                ))
              : <li key="tbd" style={{ color: "var(--color-light-50)" }}>Teammates TBD</li>
          }
        </ul>
      </div>
    </>
  )
}
