// SDK imports
import { Client } from '@notionhq/client'

export async function fetchParticipant (user) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const response = await notion.databases.query({
    database_id: process.env.NOTION_PARTICIPANTS_DATABASE_ID,
    filter: {
      property: 'Email',
      rich_text: {
        contains: user.email
      }
    }
  })

  if (response.results.length === 0)
    return null

  const participant = await notion.pages.retrieve({ page_id: response.results[0].id })
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

  const referrals = await fetchReferrals(participant)
  normalizedParticipant.referrals = referrals

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

  normalizedParticipant.teamName = teamName
  normalizedParticipant.teammates = teammates

  return normalizedParticipant
}
