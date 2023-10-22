import styles from './HackerCard.module.css'

// TODO: hook up with the Notion API to conditionally render the ID, team name (or "judge"), and teammates
// TODO: referral system

export default async function HackerCard ({ user }) {
  const hackerId = user.participant?.hackerId
  const teamName = user.participant?.teamName
  const teammates = user.participant?.teammates

  return (
    <div className={styles.card}>
      {
        user.participant &&
        <div className={styles.id}>
          <p className={styles.prefix}>{prefixId(hackerId)}</p>
          <p className={styles.number}>{hackerId}</p>
        </div>
      }
      <h3 className={styles.name}>{user.name}</h3>

      {
        teamName &&
        <>
          <div className={styles['team-bar']}>
            <h3 className={styles['team-name']}>Team {teamName}</h3>
          </div>

          <ul className={styles.teammates}>
            {
              teammates.map(teammate => <li key={teammate}><h4>{teammate}</h4></li>)
            }
          </ul>
        </>
      }

      <p className={styles['referral-count']}>0 referrals</p>
    </div>
  )
}

function prefixId (id) {
  id = id.toString()
  const prefix = '#000'
  return prefix.substring(0, prefix.length - id.length)
}
