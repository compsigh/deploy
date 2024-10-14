---
date: 2024-11-08
---

# DEPLOY/24

## Venue

- [x] Secure the Social Hive for the weekend
- [x] Reserve breakout rooms for the weekend
  - [x] LS 103
  - [x] LS 209
  - [x] LS 210
  - [x] LS 303
  - [x] LS 307
- [ ] Reach out to EMS requesting chairs for presentation day and A/V for both

## Judges

We want to have as many CS faculty members as possible this year.

A checkbox (`[x]`) means the professor has agreed. Partially checked (`[/]`) means they've been asked but are checking their schedule or something and will get back to us. Crossed (`[-]`) means they are unavailable. Not checked (`[ ]`) means we haven't asked.

- [ ] Chris Brooks
- [ ] Phil Peterson
- [x] John Cromwell
- [/] Greg Benson
- [x] Mehmet Emre
- [-] Sophie Engle
- [ ] Paul Haskell
- [ ] Olga Karpenko
- [ ] Beste Yuksel

### Email template

```plaintext
Hello dear CS faculty members,


I hope you're all doing well! I'm reaching out to cordially invite you to participate on the judges panel of DEPLOY/24, compsigh's second annual Fall hackathon. For those that I or other club leaders have spoken with, now you have it in writing. :)

DEPLOY/24 will take place Friday November 8th through Sunday November 10th in the Social Hive (first floor of Harney). Presentations begin on Sunday at 1pm, and we anticipate will continue for three hours or so. You're all invited to any part of the event you like, including lunch on Sunday at noon, an hour before presentations.

For those of you that offer extra credit for events like this, I've built an attendance API: a simple GET request to deploy.compsigh.club/api/attended/{student_dons_email} will return { "attended": true } or { "attended": false }. Note that "attendance" here means "showed up on Friday". If you prefer to set the bar at seeing the event through and presenting (which I think is a fair middle ground), just swap `attended` for `presented`.

We'd love to have you. If you're interested in participating, please let me (Edward, president of compsigh, emshturman@dons.usfca.edu) know by Friday, October 25th, and we'll be in touch shortly thereafter with more judging logistics!


Thank you for your time and consideration,

Edward Shturman
Class of 2025
```

### Extra credit

Last year, we took the Phil position re: extra credit: the incentive for coming to the hackathon should be the experience, not point scrubbing in classes.

For this year, John from E&I gave an interesting counter to that: yes, people should be in it for reasons non-transactional, *but* at the end of the day, we all have things to do.

Suppose a student has an upcoming midterm, a project due, etc. They're most excited about DEPLOY/24, but with no *guaranteed* exchange for their time, they might not be so inclined to attend. The idea is that extra credit would bump it up on their list at least a bit.

At minimum, we can ask professors if they'd be willing to provide students who attend extra credit. After the event, we will provide participating professors with a list of students who attend *on presentation day*, as a fair middle ground.

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

We agreed during our DEPLOY/23 debrief that the top-three format + people's choice is a good one. The big coefficient here is that these prizes are per winning team *member*. So, for first place, it's not $200 from us, it's $800.

Some ideas for this year's prizes:

- John from E&I has generously offered $500 in microgrants for the first place team. This helps incentivize DEPLOY/24 projects to live on past the event.
- In general, cash prizes are hard because there is a lot of bureaucracy around getting those reimbursed. We can take the L out of our budget if it would make a big incentive difference.
- We can scrap Discord Nitro.
- Something physical?
- Trophies in the shape of the event logo would be dope.

### Trophy

Diamond prism to match the logo

![](https://media.cheggcdn.com/media/234/2342320c-ee6e-4014-82f5-502563eda450/phpHhU2J8)

Engraved:

- DEPLOY/24
- (Logo)
- 1st place
- compsigh
- San Francisco

3D printed or metal if possible

## Sponsors

In total, DEPLOY/23 cost us $2,066.21, with 52 participants registered. Of course, the situation with prizes and catering likely differ, but scaling that up to 80+, we will need some help.

A checkbox (`[x]`) means the sponsor has agreed to help fund the event. Partially checked (`[/]`) means they've been asked and we haven't heard back. Crossed (`[-]`) means they are unable to support the event. Not checked (`[ ]`) means we haven't asked.

- [x] CS Department
- [x] E&I IDEA Initiative
- [ ] GitHub
- [/] Raycast
- [/] Resend
- [ ] Vercel
- [ ] Wooting

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

### DEPLOY/24

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

## Catering

Ideally, we have proper food for:

- Opening night, after opening keynote, around 7pm
- Presentation day, before presentations, around 12pm

Considerations for dinner on opening night:

- Tacos (2 per person, $10 per person):
  - Mushrooms — 10 people
  - Chicken — 16 people
  - Steak — 16 people
- Mashed potatoes ($10 per person) — 10 people
- Samosas ($3) — 16
- Spanakopita ($3) — 16
- Chicken wings (2 per person, $4) — 16 buffalo, 16 lemon pepper
- Banh mi ($5) — 16
- Tostada ($5) — 16
- Pork belly bun ($6) — 16
- Butter chicken skewer ($4) — 16
- Oatmeal raisin cookie ($2.50) — 10
- Lemon bar ($3.25) — 10
- Lemon cupcake ($3.75) — 10
- Carrot cupcake ($3.75) — 10
- Pumpkin pie $30
- Hot apple cider (for 60) — $110

Considerations for brunch on presentation day:

- [b patisserie](https://bpatisserie.com/menu)
- Pineapple King Bakery
- Toast N Egg
- Caliente
- Saigon Sandwich
- Rise & Grind
- Palm City

## Promo & outreach

- [ ] Create 8.5 × 11 promotional flyer
- [ ] Print and put up flyers
- [ ] Create 1920 × 1080 promotional banner
- [ ] Request banner to be displayed on the TVs
- [ ] Create 9:16 story posts
- [ ] Create 1:1 carousel
- [ ] Post carousel on Instagram
- [ ] Post Instagram story and add to highlights
- [ ] Create Discord announcement
- [ ] Ping `@announcements` and `@events`
- [ ] Link compsigh web platform event to DEPLOY/24 platform
- [ ] Write up announcement email for the department
- [ ] Ask Jocelyn to send out announcement
- [ ] Write up copy to accompany trailer release
- [ ] Ask Jocelyn to send out trailer

## Agenda

### Friday, November 8th

- 06:00pm: Doors open, check-in & late registration begins
- 06:30pm: Opening keynote
- 07:00pm: Dinner & looking-for-group begins
- 08:00pm: Registration deadline
- 11:00pm: Team declaration deadline

### Saturday, November 9th

Workshops, TBD

### Sunday, November 10th

- 11:30am: Project submission deadline
- 12:00pm: Lunch & presentation day check-in begins
- 01:00pm: Presentations begin
- 02:00pm: Intermission
- 02:20pm: Presentations continue
- 04:00pm: Closing keynote; results announced

## Other

Things we need to take care of, ordered by ascending complexity:

- [ ] Landing page & platform

Also:

- Organizers & ground team
- Photo & video
- Broadcast
- Merch
- Look through DEPLOY/23 todos and see what we can add here
- [Request mention in the Phoenix](https://docs.google.com/forms/d/e/1FAIpQLScWKWlOVSR_ml85Y0-NKSXUdYFdP2S9aRZj1sUvhh_3z-FO1A/viewform)

## Links

- [DEPLOY/23 Debrief & Notes for DEPLOY/24 (Notion)](https://www.notion.so/compsigh/DEPLOY-23-Debrief-Notes-for-DEPLOY-24-41fc140f771f4e84aadd7a8b743edccd)
- [DEPLOY/24 Figma](https://www.figma.com/design/VpUYrCmMWZ4QgTRxdRYhfz/24?node-id=3-21&t=mqVHo6c71tMPo0hs-1)
- [DEPLOY/24 Expenses Google Sheet](https://docs.google.com/spreadsheets/d/1iM5mFngB0PDB9p6ZLvPOcF3Sw9zzXs49h19lwstsAcA/edit?usp=sharing)
