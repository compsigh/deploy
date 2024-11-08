import { type User } from "@/functions/user-management"
import { getTeamById } from "@/functions/db/team"
import { getParticipantByEmail } from "@/functions/db/participant"
import { getAllJudges, getJudgeByEmail } from "@/functions/db/judge"

import styles from "./HackerCard.module.css"

export async function HackerCard({ user }: { user: User }) {
  const judge = await getJudgeByEmail(user.email)
  const participant = await getParticipantByEmail(user.email)
  if (!judge && !participant)
    return null
  const name = user.name
  const team = await getTeamById(participant?.teamId)
  const teamName = (judge && "Judge") || team?.name || `${name.split(" ")[0]}'s Team`
  const teammates = (judge && (await getAllJudges()).filter(judge => judge.email !== user.email))
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
          {
            teammates
              ?
                teammates.map(teammate => (
                  <li key={teammate.email}>
                    {teammate.name}
                  </li>
                ))
              : <li key="tbd">Teammates TBD</li>
          }
        </ul>
      </div>
    </>
  )
}
