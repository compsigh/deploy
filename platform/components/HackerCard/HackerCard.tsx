import { type User } from "next-auth"
import { type Judge, type Participant } from "@prisma/client"
import { getTeamById } from "@/functions/db/team"
import { getParticipantByEmail } from "@/functions/db/participant"
import { getAllJudges, getJudgeByEmail } from "@/functions/db/judge"

import styles from "./HackerCard.module.css"

export async function HackerCard({ user }: { user: User }) {
  let name: string
  let teamName: string
  let teammates: Array<Participant> | Array<Judge>
  const judge = await getJudgeByEmail(user.email)
  const participant = await getParticipantByEmail(user.email)

  if (judge) {
    name = judge.name
    teamName = "Judge"
    const allJudges = await getAllJudges()
    teammates = allJudges.filter(judge => judge.email !== user.email)
  }

  else if (participant) {
    name = participant.name
    const team = await getTeamById(participant.teamId)
    teamName = team.name
    teammates = team.participants.filter(participant => participant.email !== user.email)
  }

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
                    <h4>{teammate.name}</h4>
                  </li>
                ))
              : <li key="tbd"><h4>Teammates TBD</h4></li>
          }
        </ul>
      </div>
    </>
  )
}
