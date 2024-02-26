[![DEPLOY/23 Banner](https://raw.githubusercontent.com/compsigh/deploy/main/public/banner-grid.png)](https://deploy.compsigh.so)

# DEPLOY/23

Welcome to the repo for the landing page & platform for DEPLOY/23 — [compsigh](https://compsigh.so)'s first hackathon, and our biggest event of the semester. An interdisciplinary three-day event running from Friday November 17th – Sunday November 19th, bringing together the best minds in CS, design, and engineering to hack on a project for a weekend.

One of our club's values is [Learning/Building in Public](https://www.swyx.io/learn-in-public), so in that spirit this repo is publicly available. Hopefully it can serve as inspiration for people in making their own hackathons a unique experience! 💛

## Stack

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
- [Tally](https://tally.so)
- [Notion API](https://developers.notion.com)

## Technical Breakdown

### Registration

The participant registration form is courtesy of Tally, a Notion-like form builder. The form is embedded in the page using an `<iframe>`, and the submissions are synced with a Notion database.

### Authentication

While it's unlikely anything malicious would happen, unfortunately Tally does not yet have any native permissions, so the situation called for a DIY workaround. The form submission page is locked behind an authwall (only accessible to USFCA students) and expects matching `firstName`, `lastName`, and `email` query parameters. We've increased the likelihood that the form is only ever submitted by the logged-in student. Check out [the `ParamsValidator` component](/components/ParamsValidator.tsx) to see how this works.

### Console

![DEPLOY/23 console](/public/console.png)

The Console shows the participant (or judge) a set of personalized todos. For example, if they've yet to declare a team, the Console will show them a link where they can do so.
The Console also displays the participant's unique Hacker Card, which renders participant data fetched from the Notion API — we have a database each for **participants**, **teams**, **referrals**, **project submissions**, and **project evaluations**.

## Contributing

We plan on building on top of this platform for future compsigh DEPLOY events. We don't have a contribution framework at the moment, but any ideas for what you'd like to see in the future are welcome and appreciated! Say hi in the [compsigh Discord](https://discord.compsigh.so).
