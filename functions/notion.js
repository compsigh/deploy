// SDK imports
import { Client } from '@notionhq/client'

export async function fetchParticipant (user) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  let response = await notion.databases.query({
    database_id: process.env.NOTION_PARTICIPANTS_DATABASE_ID
  })
  const participants = response.results

  let hasMore = response.has_more
  while (hasMore) {
    response = await notion.databases.query({
      database_id: process.env.NOTION_PARTICIPANTS_DATABASE_ID,
      start_cursor: response.next_cursor
    })
    participants.push(...response.results)
    hasMore = response.has_more
  }

  let participant = null
  for (const entry of participants)
    if (entry.properties.Email.title[0].text.content === user.email) {
      participant = entry
      break
    }

  if (participant)
    participant = await notion.pages.retrieve({ page_id: participant.id })
  return participant
}

export async function fetchTeam (participant) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const teamPageId = participant.properties.Team?.relation[0]?.id
  if (!teamPageId)
    return null
  const team = await notion.pages.retrieve({ page_id: teamPageId })
  return team
}

export async function fetchReferrals (participant) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const referrals = await notion.databases.query({
    database_id: process.env.NOTION_REFERRALS_DATABASE_ID,
    filter: {
      property: 'Referred by',
      rich_text: {
        contains: participant.properties.Email.title[0].text.content
      }
    }
  })

  return referrals.results.length
}

export async function normalizeParticipant (participant) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const normalizedParticipant = {}
  const props = participant.properties
  const hackerId = props['Hacker ID'].unique_id.number
  normalizedParticipant.hackerId = hackerId

  const team = await fetchTeam(participant)
  if (!team)
    return normalizedParticipant
  const teamName = team.properties.Name.title[0].text.content
  const teammateIds = team.properties.Members.relation

  const teammates = []
  for (const teammateId of teammateIds) {
    if (teammateId.id === participant.id)
      continue
    const teammate = await notion.pages.retrieve({ page_id: teammateId.id })
    teammates.push(`${teammate.properties['First Name'].rich_text[0].text.content} ${teammate.properties['Last Name'].rich_text[0].text.content}`)
  }

  const referrals = await fetchReferrals(participant)

  normalizedParticipant.teamName = teamName
  normalizedParticipant.teammates = teammates
  normalizedParticipant.referrals = referrals

  return normalizedParticipant
}
