import styles from './HackerCard.module.css'

// TODO: conditional rendering for judges
// TODO: team system
// TODO: referral system

export default async function HackerCard ({ user }) {
  const hackerId = user.participant?.hackerId
  const teamName = user.participant?.teamName
  const teammates = user.participant?.teammates

  return (
    <div className={styles.card}>
      <div className={styles.id}>
      {
        user.participant
          ? <>
              <p className={styles.prefix}>{prefixId(hackerId)}</p>
              <p className={styles.number}>{hackerId}</p>
            </>
          : <p className={styles.prefix}>#TBD</p>
      }
      </div>

      <h3 className={styles.name}>{user.name}</h3>

      <div className={styles['team-bar']}>
      {
        teamName
          ? <h3 className={styles['team-name']}>Team {teamName}</h3>
          : <h3 className={styles['team-name']}>Team TBD</h3>
      }
      </div>

        <ul className={styles.teammates}>
          {
            teammates
              ? teammates.map(teammate => <li key={teammate}><h4>{teammate}</h4></li>)
              : <li key='tbd'><h4>Teammates TBD</h4></li>
          }
        </ul>

      <p className={styles['referral-count']}>0 referrals</p>
    </div>
  )
}

function prefixId (id) {
  id = id.toString()
  const prefix = '#000'
  return prefix.substring(0, prefix.length - id.length)
}
