# DEPLOY/24

## Venue

- [x] Secure the Social Hive for the weekend
- [x] Reserve breakout rooms for the weekend
  - [x] LS 103
  - [x] LS 209
  - [x] LS 210
  - [x] LS 303
  - [x] LS 307
- [x] Reach out to EMGS requesting chairs for presentation day and A/V for both

## Judges

We want to have as many CS faculty members as possible this year.

A checkbox (`[x]`) means the professor has agreed. Partially checked (`[/]`) means they've been asked but are checking their schedule or something and will get back to us. Crossed (`[-]`) means they are unavailable. Not checked (`[ ]`) means we haven't asked.

- [x] Greg Benson
- [x] Paul Haskell
- [x] Chris Brooks
- [x] Phil Peterson
- [x] Mehmet Emre
- [x] John Cromwell
- [-] Julia Nolfo
- [-] Sophie Engle
- [-] Olga Karpenko

### Extra credit

Last year, we took the Phil position re: extra credit: the incentive for coming to the hackathon should be the experience, not point scrubbing in classes.

For this year, John from E&I gave an interesting counter to that: yes, people should be in it for reasons non-transactional, *but* at the end of the day, we all have things to do.

Suppose a student has an upcoming midterm, a project due, etc. They're most excited about DEPLOY/24, but with no *guaranteed* exchange for their time, they might not be so inclined to attend. The idea is that extra credit would bump it up on their list at least a bit.

This year, we are asking professors if they'd be willing to provide students who attend with extra credit. We'll have an attendance API professors can query with a `student_email`. They'll be able to set the bar at attending opening night, or presenting on day three as a fair middle ground.

Professors' responses:

- Jon Rahoi: yes
- Paul Haskell: no
- Alark Joshi: yes
- Sophie Engle: yes
- Edward Rees: yes
- Phil Peterson: yes
- Kristin Jones: yes
- Julia Nolfo: maybe
- Mehmet Emre: yes
- Matthew Malensek: yes
- Vahab Pournaghshband: no

## Prizes

The general consensus — both on leadership and our sponsors — is that our prizes for last year's winners were a bit...generous:

```plaintext
1st Place    >> $100
                Semester access to club AI resources
                Discord Nitro
                Recognition on compsigh platforms
2nd Place    >> $50
                Discord Nitro
                Recognition on compsigh platforms
3rd Place    >> $25
                Recognition on compsigh platforms
PPL'S CHOICE >> Cat-shaped pillow 🐱
```

We agreed during our DEPLOY/23 debrief that the top-three format + people's choice is a good one. The big coefficient here is that these prizes were per winning team *member*. So, for first place, it wasn't $200 from us, it was $800.

Some ideas for this year's prizes:

- John from E&I has generously offered $500 in microgrants for the first place team. This helps incentivize DEPLOY/24 projects to live on past the event.
- In general, cash prizes are hard because there is a lot of bureaucracy around getting those reimbursed. We can take the L out of our budget if it would make a big incentive difference.
- We can scrap Discord Nitro.
- Something physical?
- Trophies in the shape of the event logo would be dope.

First place:

- Custom-made trophies for all team members
- A year of Discord Nitro for all team members
- A semester of ChatGPT Plus for all team members
- Automatic approval for $500 microgrant from the Entrepreneurship & Innovation IDEA Initiative

Second place:

- A year of Discord Nitro for all team members
- Automatic approval for $500 microgrant from the Entrepreneurship & Innovation IDEA Initiative

Third place:

- Automatic approval for $500 microgrant from the Entrepreneurship & Innovation IDEA Initiative

### Trophy

The working idea for the first place trophy — one given to each member of the first place team — is a diamond prism to match the logo:

![Diamond prism illustration](https://media.cheggcdn.com/media/234/2342320c-ee6e-4014-82f5-502563eda450/phpHhU2J8)

Engraved on one of the top faces is:

- "DEPLOY/24" with the event logo
- "1st Place"

We want the trophy cast in metal if possible; if not, 3D printed.

- [x] Trophy vector design
- [-] Order build (3D printed by Jet)

## Sponsors

In total, DEPLOY/23 cost us $2,066.21, with 52 participants registered. Of course, the situation with prizes and catering likely differ, but scaling that up to 80+, we will need some help.

A checkbox (`[x]`) means the sponsor has agreed to help fund the event. Partially checked (`[/]`) means they've been asked and we haven't heard back. Crossed (`[-]`) means they are unable to support the event. Not checked (`[ ]`) means we haven't asked.

- [x] CS Department: up to $1000
- [x] E&I IDEA Initiative: up to $3000
- [-] GitHub (past deadline)
- [-] Vercel (budget covered)
- [-] Wooting (didn't reach out)
- [-] Resend (reached out September 4th, never heard back)
- [-] Raycast (reached out September 4th, never heard back)

## Point system & rubric

Last year, we operated on a closed-source rubric, only sharing:

> Projects will be evaluated on **Craft & Polish**, **Presentation & Delivery**, and **Ambition & Technical Complexity**.
>
> Here are some tips based on what judges will be looking for:
>
> - Be creative and engaging — see some ideas above
> - Clearly define the problem (and target users for whom) you sought to solve
> - Really take some time to prepare. This is one of the reasons there is an hour between the submission deadline and check-in!

### Point formula

Our original point formula from DEPLOY/23:

```plaintext
(average of judge evaluations) +
(referrals per team member) +
(number of different majors on the team)
```

The weighting on this was scuffed — teams that had any more than two referrals had an outsized advantage, and we ended up having to adjust on presentation day.

Here are the changes to the point formula and calculation for DEPLOY/24:

- We will use solely judge evaluations for calculating a team's score. External factors — like referrals or event attendance — will not impact a team's score.
- Our criteria rating range is going from 1 to 10, to 1 (barely met, if at all) to 4 (met well, if not exceeded).
- Judges will not be able to input their own offset `-2` to `+2` value, and must use only our criteria and rating range.
- Rather than calculating the *average* of judge criteria ratings across *categories*, all criteria will be *weighted equally*, and calculated as *sums*.
- We are removing the criterion, "The team presented themselves as prepared, confident, and engaged."
- We will open-source this year's rubric — we have no reason to be concerned participants will "game the system"; isn't that what we want? :)

### Basic qualifications

If any of these are lacking in a team's presentation, organizers and/or judges will reach out to the team in question for elaboration. Extenuating circumstances will be evaluated case-by-case, but if a team proves unable to remedy the situation, they are subject to disqualification.

- All teammates (as when they registered by the team declaration deadline) are present and on-stage.
- All teammates' roles and contributions are clearly articulated.
- Where applicable, the project is open-source or is otherwise publicly accessible.

### Criteria we're *not* looking to evaluate

- Innovation: whether or not a judge has heard of it doesn't make it innovative. Also, we shouldn't penalize teams for doing something *better* that another product or service does.
- Completeness: making mistakes & learning from them is one of the key benefits in a scrappy, experimental environment. As long as teams demonstrate that growth, all is well.

### Score calculation

- Criteria are weighted equally.
- Criteria are rated by judges on a linear scale, from 1 (barely met, if at all) to 4 (met well, if not exceeded).
- Each criteron's rating is added to a running total to represent the judge's evaluation for a team.
- The average of all judges' evaluation totals for a given team represents the team's total score.

### Criteria we *are* evaluating

Craft & Polish:

- Despite the time limit, the team showcased their effort in creating a polished solution, with attention to detail and user experience.

Presentation & Delivery:

- The team presented their project in a creative and engaging way.
- The team defined the problem they sought to solve, identifying a clear and focused target user, need, and context.
- The team showcased their prototype solution, mentioning whether or not they accomplished their goal. If the project was incomplete, the team mentioned what worked, what didn't, and how the team would continue to develop the project.

Ambition & Technical Complexity:

- The team took on an ambitious challenge, through the scale & scope of the problem, their tech stack, or otherwise impressive medium.

### Grade level weighting

To balance the fact we have participants from all grade levels, one idea is to introduce a weighting system that scales by average grade level on a team. e.g.:

- Average 4th-year team: `1.00x` multiplier: `16.0` → `16.0` out of 20 points
- Average 3rd-year team: `1.10x` multiplier: `16.0` → `17.6` out of 20 points
- Average 2nd-year team: `1.15x` multiplier: `16.0` → `18.4` out of 20 points
- Average 1st-year team: `1.20x` multiplier: `16.0` → `19.2` out of 20 points

So, a team composed of a freshman, sophomore, junior, and senior = `1.20x + 1.15x + 1.10x + 1.00x = 4.45 / 4 = 1.1125x`. If that team scored `16.0`, it would be bumped up to a `17.8`.

This would absolve the need for any beginner/advanced team brackets or different evaluation criteria.

## Trailer

### Story & cinematic universe

The DEPLOY/24 trailer builds on the cinematic universe developed last year. Here's what we know:

- The story is set in San Francisco, 2034 (10 years after each hackathon).
- AGI was developed, but it went wrong, in the sense that:
- The government commandeered it to impose a surveillance state.
- Vigilante hackers rose up in 2033 (during the events of DEPLOY/23) to fight.
- The government is aware of the hackers' existence, but denies it, because (1) it would question their control, and (2) they would be admitting wrongdoing, or giving reason to suspect as much.
- Ordinary civilians don't know of the hackers' existence, and those that do generally avoid talking about them, for fear of persecution, and because most are not immediately convinced of the hackers' benevolence.
- The hackers are fighting for a higher cause against the misuse of AGI by the government. In-universe, there may be several factions of hackers, but they aren't explicitly fighting each other — *we are ignoring the IRL competitive nature of DEPLOY (this also contributes to the compsigh narrative of working together)*.
- The events of DEPLOY are an *ongoing* conflict, rather than yearly (as it is IRL). This is because (1) expanding the cinematic universe can be gradual, rather than a lot of pressure to come up with a new story each hackathon, and (2) it doesn't confine DEPLOY as a hackathon IRL to a yearly cadence, should we ever do it each semester or something like that.

### DEPLOY/24 trailer

All a work-in-progress, these describe *potential* shots we could work with to compose scenes for the trailer.

Settings:

- Apartment building
- Downtown
- Bay Bridge/Golden Gate Bridge
- Train station

Plot:

- Fight vs. govt. operatives
- Escape/extraction
- Chase on the bridge
  - Flying cars
  - Other neon city typeshit
- Blending in with civilians (closing scene?)
- Team "mission", some relaying info to others "in the field"
- Stakeout/scoping out a building (abandoned?)
- Surveillance cameras
- CCTV of all the locations
- Power plant
- Investigation of the broadcast tower break-in from last year
- Dialogue by ordinary civilians and/or hackers to introduce the story re: AGI
- Shots of govt. operatives doing their bad guy things
- Filler shots of civilian life/aesthetic neon SF

Music options:

- Stay
- Stormy Love
- Excavator Theme
- Human Nature

## Catering

The plan is to provide food for:

- Opening night, after opening keynote, around 7pm; dinner
- Throughout day two; snacks and such
- Presentation day, before presentations, around 12pm; lunch

See the **Catering** page on the Expenses Google Sheet for vendors and associated costs.

- [x] Place catering order with EMGS

## Promo & outreach

- [x] Create 8.5 × 11 flyer
- [x] Create 1:1 Instagram post
- [x] Create 16:9 banner for the TVs
- [x] Create Discord announcement
- [x] Request banner to be displayed on the TVs
- [x] Post on Instagram
- [x] Post Instagram story of post and add to highlights
- [x] Ping `@announcements` and `@events`
- [x] Print and put up flyers
  - [x] Bulletin board outside staircase
  - [x] Flight leading up to 4th floor
  - [x] 411
  - [x] 413
- [x] Ask Jocelyn to send out announcement
- [x] Ask John from E&I to send out announcement
- [x] Ask Christine from Mathematics to send out announcement
- [x] Link compsigh web platform event to DEPLOY/24 platform
- [x] Reach out to professors and promote in classes
  - [x] CS 110 Section 04
  - [x] CS 221 Section 03
  - [x] CS 110 Section 01
  - [x] CS 272 Section 04
  - [x] CS 245 Section 01
  - [x] CS 245 Section 02
  - [x] CS 272 Section 03
  - [x] CS 221 Section 01
  - [x] CS 221 Section 02
  - [x] CS 256 Section 01
  - [x] CS 186 Section 01
  - [x] CS 272N Section 01
  - [x] CS 326 Section 01
  - [x] CS 111 Section 03
  - [x] CS 110 Section 02
  - [x] CS 112 Section 02
  - [x] CS 112 Section 01
- [-] Ask Jocelyn to send out trailer
- [-] Write up copy to accompany trailer release
- [-] Ask Noopur from Design to send out announcement
- [-] Ask Samantha from Engineering to send out announcement

## Agenda

### Friday, November 8th

- 06:00pm: Doors open, check-in & late registration begins
- 06:30pm: Opening keynote
- 07:00pm: Dinner & looking-for-group begins
- 08:00pm: Registration deadline
- 11:59pm: Team formation deadline

### Saturday, November 9th

- 11:00am: Office hours — chill social, light lunch, and getting help/advice from organizers/other teams on React & Next.js, design, presentations, and other topics of interest

### Sunday, November 10th

- 11:30am: Project submission deadline
- 12:00pm: Lunch & presentation day check-in begins
- 01:00pm: Presentations begin
- 02:00pm: Intermission
- 02:20pm: Presentations continue
- 04:00pm: Closing keynote; results announced

## Web platform

- [x] Registration
- [x] Team formation
- [x] Project submission
- [x] Project evaluation
- [x] Scoreboard logic
- [x] People's Choice vote
- [x] Attendance/Presentation API

## Other

- [x] Figure out photo & video
  - Gursh on photos
  - John will reach out re: student videographers
- [x] Figure out ground team — who is checking people in, etc.
- [x] Opening keynote slides
  - [Slides from DEPLOY/23](https://www.notion.so/compsigh/Create-opening-keynote-slides-97dec247b5fa4ad4ab75ffcc3298a355)
- [-] [Explainer video idea from DEPLOY/23](https://www.notion.so/compsigh/Explainer-8af12435af134c9eb560e542080ef5da)
- [-] Merch
  - Custom notecards for handwritten congrats notes
  - Shirts
- [-] [Request mention in the Phoenix](https://docs.google.com/forms/d/e/1FAIpQLScWKWlOVSR_ml85Y0-NKSXUdYFdP2S9aRZj1sUvhh_3z-FO1A/viewform)

## Links

- [DEPLOY/24 Figma](https://www.figma.com/design/VpUYrCmMWZ4QgTRxdRYhfz/24?node-id=3-21&t=mqVHo6c71tMPo0hs-1)
- [DEPLOY/24 Expenses Google Sheet](https://docs.google.com/spreadsheets/d/1iM5mFngB0PDB9p6ZLvPOcF3Sw9zzXs49h19lwstsAcA/edit?usp=sharing)
- [John's slide: info on microgrants for winners](https://docs.google.com/presentation/d/1q7fzgZxfGLvUy__q3HdlrrSeyPpcWWuRDsohANkHsMw/edit)
