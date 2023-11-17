// SDK imports
import { Client } from '@notionhq/client'

export async function fetchJudge (user) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const confirmedJudges = await notion.databases.query({
    database_id: process.env.NOTION_JUDGES_DATABASE_ID,
    filter: {
      property: 'Email',
      email: {
        is_not_empty: true
      }
    }
  })

  let judge = confirmedJudges.results.find(judge => judge.properties.Email.email === user.email)
  if (!judge)
    return null
  judge = await notion.pages.retrieve({ page_id: judge.id })

  const normalizedJudge = {}
  normalizedJudge.teamName = 'Judge'
  normalizedJudge.teammates = []
  const otherJudges = confirmedJudges.results.filter(judge => judge.properties.Email.email !== user.email)
  for (const otherJudge of otherJudges) {
    const otherJudgePage = await notion.pages.retrieve({ page_id: otherJudge.id })
    normalizedJudge.teammates.push(`${otherJudgePage.properties.Name.title[0].text.content}`)
  }

  return normalizedJudge
}

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

export async function submissionFound (participant) {
  let submitted = false

  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const submissions = await notion.databases.query({
    database_id: process.env.NOTION_SUBMISSIONS_DATABASE_ID,
    filter: {
      property: 'Submitted by',
      rich_text: {
        contains: participant.properties.Email.title[0].text.content
      }
    }
  })

  if (submissions.results.length > 0) {
    submitted = true
    return submitted
  }

  for (const teammate of participant.teammates) {
    const teammateSubmissions = await notion.databases.query({
      database_id: process.env.NOTION_SUBMISSIONS_DATABASE_ID,
      filter: {
        property: 'Submitted by',
        rich_text: {
          contains: teammate.properties.Email.title[0].text.content
        }
      }
    })

    if (teammateSubmissions.results.length > 0) {
      submitted = true
      break
    }
  }

  return submitted
}

export async function voteFound (participant) {
  let voted = false

  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const votes = await notion.databases.query({
    database_id: process.env.NOTION_VOTES_DATABASE_ID,
    filter: {
      property: 'Participant email',
      rich_text: {
        contains: participant.properties.Email.title[0].text.content
      }
    }
  })

  if (votes.results.length > 0) {
    voted = true
    return voted
  }
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
    teammates.push(teammate)
  }

  normalizedParticipant.teamName = teamName
  normalizedParticipant.teammates = teammates

  participant.teammates = teammates
  const submitted = await submissionFound(participant)
  normalizedParticipant.submitted = submitted

  const voted = await voteFound(participant)
  normalizedParticipant.voted = voted

  return normalizedParticipant
}
