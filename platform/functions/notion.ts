import { Client, isFullPageOrDatabase } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { User } from 'next-auth'

export type TitlePagePropertyType = {
  type: 'title'
  id: string
  title: Array<{
    type: 'text'
    text: {
      content: string
      link: {
        url: string
      } | null
    }
  }>
}

export type RichTextPagePropertyType = {
  type: 'rich_text'
  rich_text: {
    text: {
      content: string
    }
  }[]
  id: string
  name: string
}

export type RelationPagePropertyType = {
  type: 'relation'
  relation: Array<{
    id: string
  }>
  id: string
}

async function fetchJudges() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const confirmedJudgesResponse = await notion.databases.query({
    database_id: process.env.NOTION_JUDGES_DATABASE_ID,
    filter: {
      property: 'Status',
      select: {
        equals: 'Confirmed'
      }
    }
  })

  return confirmedJudgesResponse.results as PageObjectResponse[]
}

export async function fetchJudgeNotionPage(user: User) {
  const confirmedJudges = await fetchJudges()

  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const judge = confirmedJudges.find((judge) => {
    if (!isFullPageOrDatabase(judge))
      return false
    const judgeEmail = judge.properties.Email as TitlePagePropertyType
    return judgeEmail.title[0].text.content === user.email
  })
  if (!judge)
    return null
  return await notion.pages.retrieve({ page_id: judge.id }) as PageObjectResponse
}

export async function fetchJudgeTeammatesNotionPages(user: User) {
  const confirmedJudges = await fetchJudges()

  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  const judgeTeammates = confirmedJudges.filter((judge) => {
    if (!isFullPageOrDatabase(judge))
      return false
    const judgeEmail = judge.properties.Email as TitlePagePropertyType
    return judgeEmail.title[0].text.content !== user.email
  })

  const judgeTeammatesNotionPages: PageObjectResponse[] = []
  for (const judge of judgeTeammates) {
    const judgePage = await notion.pages.retrieve({ page_id: judge.id }) as PageObjectResponse
    judgeTeammatesNotionPages.push(judgePage)
  }

  return judgeTeammatesNotionPages
}

export async function fetchParticipantNotionPage(user: User) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const participantResponse = await notion.databases.query({
    database_id: process.env.NOTION_PARTICIPANTS_DATABASE_ID,
    filter: {
      property: 'Email',
      rich_text: {
        contains: user.email
      }
    }
  })

  if (participantResponse.results.length === 0)
    return null

  return await notion.pages.retrieve({ page_id: participantResponse.results[0].id }) as PageObjectResponse
}

export async function fetchParticipantTeamNotionPage(participant: PageObjectResponse) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const participantTeam = participant.properties.Team as RelationPagePropertyType
  if (!participantTeam.relation[0])
    return null

  const teamPageId = participantTeam.relation[0].id
  return await notion.pages.retrieve({ page_id: teamPageId }) as PageObjectResponse
}

export async function fetchParticipantTeammatesNotionPages(participant: PageObjectResponse) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const team = await fetchParticipantTeamNotionPage(participant)
  if (!team)
    return null
  const teammateMembersProperty = team.properties.Members as RelationPagePropertyType
  const teammateIds = teammateMembersProperty.relation
  const teammates = []
  for (const teammateId of teammateIds) {
    if (teammateId.id === participant.id)
      continue
    const teammate = await notion.pages.retrieve({ page_id: teammateId.id })
    teammates.push(teammate)
  }

  return teammates
}

export async function fetchReferralCount(participant: PageObjectResponse) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const participantEmailProperty = participant.properties.Email as TitlePagePropertyType
  const participantEmail = participantEmailProperty.title[0].text.content

  const referrals = await notion.databases.query({
    database_id: process.env.NOTION_REFERRALS_DATABASE_ID,
    filter: {
      property: 'Referred by',
      rich_text: {
        contains: participantEmail
      }
    }
  })

  return referrals.results.length
}

export async function submissionFound(participant: PageObjectResponse) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const participantEmailProperty = participant.properties.Email as TitlePagePropertyType
  const participantEmail = participantEmailProperty.title[0].text.content

  const submissionQuery = {
    database_id: process.env.NOTION_SUBMISSIONS_DATABASE_ID,
    filter: {
      or: [
        {
          property: 'Submitted by',
          rich_text: {
            contains: participantEmail
          }
        }
      ]
    }
  }

  const team = await fetchParticipantTeamNotionPage(participant)
  const teammatesProperty = team.properties.Members as RelationPagePropertyType
  for (const entry of teammatesProperty.relation) {
    const teammate = await notion.pages.retrieve({ page_id: entry.id }) as PageObjectResponse
    const teammateEmailProperty = teammate.properties.Email as TitlePagePropertyType
    const teammateEmail = teammateEmailProperty.title[0].text.content
    submissionQuery.filter.or.push({
      property: 'Submitted by',
      rich_text: {
        contains: teammateEmail
      }
    })
  }

  const submissions = await notion.databases.query(submissionQuery)

  if (submissions.results.length > 0)
    return true
  return false
}

export async function peoplesChoiceVoteFound(participant: PageObjectResponse) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const participantEmailProperty = participant.properties.Email as TitlePagePropertyType
  const participantEmail = participantEmailProperty.title[0].text.content

  const votes = await notion.databases.query({
    database_id: process.env.NOTION_VOTES_DATABASE_ID,
    filter: {
      property: 'Participant email',
      rich_text: {
        contains: participantEmail
      }
    }
  })

  if (votes.results.length > 0)
    return true
  return false
}
