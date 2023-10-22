import styles from './HackerCard.module.css'

// TODO: hook up with the Notion API to conditionally render the ID, team name (or "judge"), and teammates
// TODO: referral system

export default async function HackerCard ({ user }) {
  return (
    <div className={styles.card}>
      <div className={styles.id}>
        <p className={styles.prefix}>{prefixId('1')}</p>
        <p className={styles.number}>1</p>
      </div>
      <h3 className={styles.name}>{user.name}</h3>

      <div className={styles['team-bar']}>
        <h3 className={styles['team-name']}>Team DEPLOY</h3>
      </div>

      <ul className={styles.teammates}>
        <li><h4>Teammate 1</h4></li>
        <li><h4>Teammate 2</h4></li>
        <li><h4>Teammate 3</h4></li>
        <li><h4>Teammate 4</h4></li>
      </ul>

      <p className={styles['referral-count']}>0 referrals</p>
    </div>
  )
}

function prefixId (id) {
  const prefix = '#000'
  return prefix.substring(0, prefix.length - id.length)
}
