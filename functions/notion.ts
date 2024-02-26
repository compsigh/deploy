import { Client, isFullPageOrDatabase } from '@notionhq/client'
import type { GetPageResponse } from '@notionhq/client/build/src/api-endpoints'
import type { User } from 'next-auth'

export type judgePageTitleType = {
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

export async function fetchJudges () {
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

  const confirmedJudges = confirmedJudgesResponse.results
  return confirmedJudges
}

export async function fetchJudgeNotionPage (user: User) {
  const confirmedJudges = await fetchJudges()

  const notion = new Client({ auth: process.env.NOTION_API_KEY })
  let judge = confirmedJudges.find((judge) => {
    if (!isFullPageOrDatabase(judge))
      return false
    const judgeEmail = judge.properties.Email as judgePageTitleType
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
    const judgeEmail = judge.properties.Email as judgePageTitleType
    return judgeEmail.title[0].text.content !== user.email
  })

  const judgeTeammatesNotionPages: GetPageResponse[] = []
  for (const judge of judgeTeammates) {
    const judgePage = await notion.pages.retrieve({ page_id: judge.id })
    judgeTeammatesNotionPages.push(judgePage)
  }

  return judgeTeammatesNotionPages
}

