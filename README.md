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

Aside from JSX and CSS, the platform is primarily composed of cohesive integrations.

### Registration

The participant registration form is courtesy of Tally, a fantastic Notion-like form builder. The form is embedded in the page using an `<iframe>`, and the submissions are synced with a Notion database.

### Authentication

While it's unlikely anything malicious or even accidental would occur with the form, unfortunately Tally does not yet have any native safety integrations, so the situation called for a DIY workaround. Not only is the form submission page locked behind an authwall (only accessible to USFCA students) — thanks to NextAuth — but it also expects `firstName`, `lastName`, and `email` query parameters. Effectively, the form can only be submitted by the logged-in student. Check out [the `ParamsValidator` component](/components/ParamsValidator.js) to see how this works.

### Hacker Card

![Hacker Card screenshot](/public/dashboard-hackercard.png)

The Hacker Card is a custom component that nicely renders participant data fetched from the Notion database.

> ⚠️ Be aware that querying three databases (for us, we have one for participants, teams, and referrals (*could probably eliminate this one honestly*)) on each request is not the most performant, and will result in noticeable latency. I'm working on a solution whereby page load is independent of rendering the card.

## Contributing

We plan on building on top of this platform for future compsigh DEPLOY events. We don't have a contribution framework at the moment, but any ideas for what you'd like to see in the future are welcome and appreciated! Say hi in the [compsigh Discord](https://discord.compsigh.so).
