import { Client, isFullPageOrDatabase } from '@notionhq/client'
import type { GetPageResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type { User } from 'next-auth'

type TitlePagePropertyType = {
  type: "title",
  id: string,
  title: Array<{
    type: "text",
    text: {
        content: string,
        link: {
            url: string
        } | null
    }
  }>
}

type RelationPagePropertyType = {
  type: "relation";
  relation: Array<{
      id: string;
  }>;
  id: string;
}

async function fetchJudges () {
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

  return confirmedJudgesResponse.results
}

export async function fetchJudgeNotionPage (user: User) {
  const confirmedJudges = await fetchJudges()

  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  let judge = confirmedJudges.find((judge) => {
    if (!isFullPageOrDatabase(judge))
      return false
    const judgeEmail = judge.properties.Email as TitlePagePropertyType
    return judgeEmail.title[0].text.content === user.email
  })
  if (!judge)
    return null
  return await notion.pages.retrieve({ page_id: judge.id })
}

export async function fetchJudgeTeammatesNotionPages (user: User) {
  const confirmedJudges = await fetchJudges()

  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  let judgeTeammates = confirmedJudges.filter((judge) => {
    if (!isFullPageOrDatabase(judge))
      return false
    const judgeEmail = judge.properties.Email as TitlePagePropertyType
    return judgeEmail.title[0].text.content !== user.email
  })

  const judgeTeammatesNotionPages: GetPageResponse[] = []
  for (const judge of judgeTeammates) {
    const judgePage = await notion.pages.retrieve({ page_id: judge.id })
    judgeTeammatesNotionPages.push(judgePage)
  }

  return judgeTeammatesNotionPages
}

export async function fetchParticipantNotionPage (user: User) {
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

  return await notion.pages.retrieve({ page_id: participantResponse.results[0].id })
}

export async function fetchParticipantTeamNotionPage (participant: PageObjectResponse) {
  const notion = new Client({ auth: process.env.NOTION_API_KEY })

  const participantTeam = participant.properties.Team as RelationPagePropertyType
  if (!participantTeam.relation[0])
    return null

  const teamPageId = participantTeam.relation[0].id
  return await notion.pages.retrieve({ page_id: teamPageId })
}

}

