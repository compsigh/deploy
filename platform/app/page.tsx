// Next
import Link from "next/link"
import Image from "next/image"

// Auth
import { auth } from "@/auth"
import { checkAuth, type User } from "@/functions/user-management"

// Component imports
import { PlayH1 } from "@/components/PlayH1"
import { Button } from "@/components/Button"

// Styles
import styles from "./Home.module.css"

function ConsoleButton({ user }: { user: User | false }) {
  if (user)
    return <Button destination="/console">Console &gt;</Button>
  else
    return <Button type="login">Console &gt;</Button>
}

export default async function Home() {
  const session = await auth()
  const user = checkAuth(session)

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <PlayH1>DEPLOY/24</PlayH1>
        <h3 className={`${styles["subtitle-mobile"]} ${styles.subtitle}`}>
          Social Hive (Harney First Floor)
          <br />
          Friday, November 08
          <br />
          Sunday, November 10
        </h3>
        <h3 className={styles.subtitle}>
          Social Hive (Harney First Floor)
          <br />
          Friday, November 08 – Sunday, November 10
        </h3>
        <p className={styles.description}>
          <Link href="https://compsigh.club" target="_blank">compsigh</Link>&apos;s second annual hackathon, and our biggest event of the semester. A not-to-miss, hype weekend for meeting cool people &amp;&amp; building cool things.
        </p>
        <ConsoleButton user={user} />
      </header>

      <section className={styles.details}>
        <section>
          <h2>Eligibility</h2>
          <p>DEPLOY/24 is geared towards CS and our friends from other creative areas of study like design, engineering, and E&I, but all USF students are welcome and encouraged to participate!</p>
          <p>Anyone is welcome to come hang out and hack, but <strong>only USF students who register for the event will be eligible to win</strong>.</p>
          <p>Participants can form teams of 1–4.</p>
          <p>All team members must be on stage on presentation day to be eligible to win.</p>
          <table>
            <thead>
              <tr>
                <th>Deadline</th>
                <th>Closes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Registration</td>
                <td>November 08, 08:00pm</td>
              </tr>
              <tr>
                <td>Team Formation</td>
                <td>November 08, 11:59pm</td>
              </tr>
              <tr>
                <td>Project Submission</td>
                <td>November 10, 11:30am</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Submissions</h2>
          <p>Only one team member has to submit the project on behalf of the team.</p>
          <p>Project submissions are not limited to a theme — build whatever you like! Common project formats:</p>
          <ul>
            <li>Mobile app</li>
            <li>Desktop app</li>
            <li>Applet</li>
            <li>Game</li>
            <li>Web app</li>
            <li>Website</li>
            <li>Open source contribution</li>
            <li>Hardware/robotics</li>
          </ul>
          <p>Please do not start actively building your project (brainstorming is great though) until after the Opening Keynote on Friday.</p>
          <p>For any submission, <em>before you present your project</em>, please ensure it is open-source or otherwise publicly accessible. You&apos;re welcome to keep it private until project submissions close.</p>
          <p>Submissions don&apos;t have to be complete! <em>What worked? What didn&apos;t? How would you continue to develop the project?</em></p>
        </section>

        <section>
          <h2>Presentations</h2>
          <ul>
            <li>Your team presents: 5 minutes</li>
            <li>Judges ask questions: 2 minutes</li>
            <li>Audience asks questions: 2 minutes</li>
          </ul>
          <p>You&apos;re welcome to spend your presentation time in whichever way you see fit. We highly encourage creative presentation formats! Some ideas:</p>
          <ul>
            <li>Audience interaction</li>
            <li>Fictitious product launch trailer</li>
            <li>Skit between users and problem solvers</li>
          </ul>
          <p>In your presentation, please make sure your team members&apos; roles in bringing the project to life are clearly articulated.</p>
        </section>

        <section>
          <h2>How to win</h2>
          <p>Teams can earn a People&apos;s Choice, 3rd, 2nd, or 1st Place victory.</p>
          <p>An array (lol) of professors — primarily from computer science — will be joining us on Sunday to judge presentations.</p>
          <p>Event organizers will not participate directly in judging — with the exception of any tiebreakers — but may adjust points as needed.</p>
          <p>Here is the full rubric judges will be using:</p>
          <table>
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Despite the time limit, the team showcased their effort in creating a polished solution, with attention to detail and user experience.</td>
                <td style={{ textAlign: "center" }}>4</td>
              </tr>
              <tr>
                <td>The team presented their project in a creative and engaging way.</td>
                <td style={{ textAlign: "center" }}>4</td>
              </tr>
              <tr>
                <td>The team defined the problem they sought to solve, identifying a clear and focused target user, need, and context.</td>
                <td style={{ textAlign: "center" }}>4</td>
              </tr>
              <tr>
                <td>The team showcased their prototype solution, mentioning whether or not they accomplished their goal. If the project was incomplete, the team mentioned what worked, what didn&apos;t, and how the team would continue to develop the project.</td>
                <td style={{ textAlign: "center" }}>4</td>
              </tr>
              <tr>
                <td>The team took on an ambitious challenge, through the scale &amp; scope of the problem, their tech stack, or otherwise impressive medium.</td>
                <td style={{ textAlign: "center" }}>4</td>
              </tr>
            </tbody>
          </table>
          <p>Points will be weighed based on the <em>average grade level</em> of your team.</p>
          <p>For example:</p>
          <ul>
            <li>All 4th-year team: 1.00x multiplier: 16.0 → 16.0 out of 20 points</li>
            <li>All 3rd-year team: 1.10x multiplier: 16.0 → 17.6 out of 20 points</li>
            <li>All 2nd-year team: 1.15x multiplier: 16.0 → 18.4 out of 20 points</li>
            <li>All 1st-year team: 1.20x multiplier: 16.0 → 19.2 out of 20 points</li>
            <li>One out of each: 1.1125x multiplier: 16.0 → 17.8 out of 20 points</li>
          </ul>
        </section>

        <section>
          <h2>Prizes</h2>
          <p>TBA :)</p>
        </section>

        <section>
          <h2>Agenda</h2>
          <p>
            Click to <Link href="https://calndr.link/event/HPLPX7Si10">add DEPLOY/24 to your calendar</Link>!
          </p>
          <p>Friday, November 08</p>
          <table>
            <tbody>
              <tr>
                <td style={{ width: 120 }}>06:00pm</td>
                <td>Doors open, check-in &amp; late registration begins</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>06:30pm</td>
                <td>Opening Keynote</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>07:00pm</td>
                <td>Dinner &amp; looking-for-group begins</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>08:00pm</td>
                <td>Registration deadline</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>11:59pm</td>
                <td>Team formation deadline</td>
              </tr>
            </tbody>
          </table>
          <p>Saturday, November 09</p>
          <table>
            <tbody>
              <tr>
                <td style={{ width: 120 }}>TBA</td>
                <td>Office hours: design jam</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>TBA</td>
                <td>Office hours: how to kill it at presentations</td>
              </tr>
            </tbody>
          </table>
          <p>Sunday, November 10</p>
          <table>
            <tbody>
              <tr>
                <td style={{ width: 120 }}>11:30am</td>
                <td>Project submission deadline</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>12:00pm</td>
                <td>Lunch &amp; presentation day check-in begins</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>01:00pm</td>
                <td>Presentations begin</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>02:00pm</td>
                <td>Intermission</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>02:20pm</td>
                <td>Presentations continue</td>
              </tr>
              <tr>
                <td style={{ width: 120 }}>04:00pm</td>
                <td>Closing Keynote; results announced</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section>
          <h2>Breakout Spaces</h2>
          <p>These rooms will be available throughout the weekend for teams to work in:</p>
          <ul>
            <li>LS 103</li>
            <li>LS 209</li>
            <li>LS 210</li>
            <li>LS 303</li>
            <li>LS 307</li>
          </ul>
        </section>

        <section className={styles.resources}>
          <h2>Resources</h2>
          <p>Whether it&apos;s your first-ever hackathon, or you&apos;re a seasoned hacker, we hope you&apos;ll enjoy the event! To get the most out of the experience, here are some pieces of advice compsigh members have contributed:</p>
          <blockquote>
            <p><em>Challenge yourself: in 72 hours, I learned more about React &amp; Next.js than I did in the 3 months prior. Don&apos;t be scared to pick a stack you&apos;re not familiar with. You&apos;ll learn more than you think.</em></p>
          </blockquote>
          <blockquote>
            <p><em>Don&apos;t be afraid to mess up or not having something functioning as long as you took something out of it!</em></p>
          </blockquote>
          <blockquote>
            <p><em>Go in with a plan to learn, and have fun. It&apos;s a good place to network, meet new people, and explore different opportunities as well.</em></p>
          </blockquote>
          <blockquote>
            <p><em>Check out <Link href="https://www.figma.com/community/file/1144013421600974167">GitHub&apos;s design system for hackathons</Link>.</em></p>
          </blockquote>
          <blockquote>
            <p><em>Document your process! Not just for the presentations, but for the camera roll too. :)</em></p>
          </blockquote>
        </section>
      </section>

      <footer className={styles.footer}>
        <h2>Good luck, have fun!</h2>
        <ConsoleButton user={user} />

        <div className={styles["version-status"]}>
          <Image
            src="/circle.svg"
            alt="circle"
            width={10}
            height={10}
            className="fade"
          />
          <p>v2.1.0 | <Link href={"https://github.com/compsigh/deploy"} target="_blank">Source Code</Link></p>
        </div>
      </footer>
    </main>
  )
}
