import type { User } from 'next-auth'

import {
  fetchJudgeNotionPage,
  fetchJudgeTeammatesNotionPages,
  fetchParticipantNotionPage,
  fetchParticipantTeamNotionPage,
  fetchParticipantTeammatesNotionPages,
  fetchReferralCount,
  type RichTextPagePropertyType,
  type TitlePagePropertyType
} from '@/functions/notion'

import {
  type PageObjectResponse,
  type UniqueIdPropertyItemObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

import { Button } from '@/components/Button'

import styles from './HackerCard.module.css'

function prefixId(id: number) {
  const idStringified = id.toString()
  const prefix = '#000'
  return prefix.substring(0, prefix.length - idStringified.length)
}

export async function HackerCard({ user }: { user: User }) {
  let name: string
  let hackerId: number
  let teamName: string
  let teammatesPages: Array<PageObjectResponse>
  let referrals: number
  const judge = await fetchJudgeNotionPage(user)
  const participant = await fetchParticipantNotionPage(user)

  if (judge) {
    const nameProperty = judge.properties.Name as TitlePagePropertyType
    name = nameProperty?.title[0].text.content
    hackerId = 0
    teamName = 'Judge'
    teammatesPages = await fetchJudgeTeammatesNotionPages(judge)
    referrals = 0
  }

  else if (participant) {
    const nameProperty = participant.properties.Name as TitlePagePropertyType
    name = nameProperty?.title[0].text.content
    const hackerIdProperty = participant?.properties['Hacker ID'] as UniqueIdPropertyItemObjectResponse
    hackerId = hackerIdProperty?.unique_id.number
    const team = await fetchParticipantTeamNotionPage(participant)
    const teamNameProperty = team?.properties.Name as TitlePagePropertyType
    teamName = teamNameProperty?.title[0].text.content
    teammatesPages = await fetchParticipantTeammatesNotionPages(participant)
    referrals = await fetchReferralCount(participant)
  }

  const teammates = teammatesPages.map((teammate) => {
    const emailProperty = teammate.properties.Email as TitlePagePropertyType
    const email = emailProperty.title[0].text.content
    const firstNameProperty = teammate.properties['First Name'] as unknown as RichTextPagePropertyType
    const firstName = firstNameProperty.rich_text[0].text.content
    const lastNameProperty = teammate.properties['Last Name'] as unknown as RichTextPagePropertyType
    const lastName = lastNameProperty.rich_text[0].text.content

    return {
      email,
      firstName,
      lastName
    }
  })

  return (
    <>
      <div className={styles.card}>
        <div className={styles.id}>
          {
            hackerId
              ? <>
                  <p className={styles.prefix}>{prefixId(hackerId)}</p>
                  <p className={styles.number}>{hackerId}</p>
                </>
              : <p className={styles.prefix}>#TBD</p>
          }
        </div>

        <h3 className={styles.name}>{name}</h3>

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
              ?
                teammates.map(teammate => (
                  <li key={teammate.email}>
                    <h4>{`${teammate.firstName} ${teammate.lastName}`}</h4>
                  </li>
                ))
              : <li key='tbd'><h4>Teammates TBD</h4></li>
          }
        </ul>

        <p className={styles['referral-count']}>
          {referrals ?? '?'} {referrals === 1 ? 'referral' : 'referrals'}
        </p>
      </div>

      <p className={styles['referral-text']}>
        For each participant that registers with your link, your team will earn a point.
      </p>
      <p className={styles['referral-link']}>
        <Button
          text="Copy Referral Link"
          type="copy"
          destination={`https://deploy.compsigh.so/?ref=${user.email}`}
        />
      </p>
    </>
  )
}
