import Button from './Button'
import styles from './HackerCard.module.css'

export async function HackerCard ({ user }) {
  const hackerId = user.participant?.hackerId
  const teamName = user.participant?.teamName || user.judge?.teamName
  const teammates = user.participant?.teammates || user.judge?.teammates
  const referrals = user.participant?.referrals

  return (
    <>
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
            ? <h3 className={styles['team-name']}>{teamName}</h3>
            : <h3 className={styles['team-name']}>Team TBD</h3>
        }
        </div>

        <ul className={styles.teammates}>
          {
            teammates
              ? teammates.map(
                teammate => <li key={teammate.properties.Email.title[0].text.content}>
                  <h4>{`${teammate.properties['First Name'].rich_text[0].text.content} ${teammate.properties['Last Name'].rich_text[0].text.content}`}</h4>
                </li>
              )
              : <li key='tbd'><h4>Teammates TBD</h4></li>
          }
        </ul>

        <p className={styles['referral-count']}>{referrals ?? '?'} {referrals === 1 ? 'referral' : 'referrals'}</p>
      </div>

      <p className={styles['referral-text']}>For each participant that registers with your link, your team will earn a point.</p>
      <p className={styles['referral-link']}>
        <Button text='Copy Referral Link' type='copy' destination={`https://deploy.compsigh.so/?ref=${user.email}`} />
      </p>
    </>
  )
}

function prefixId (id) {
  id = id.toString()
  const prefix = '#000'
  return prefix.substring(0, prefix.length - id.length)
}
