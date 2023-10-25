// Style imports
import Link from 'next/link'
import styles from './Home.module.css'
import Button from '@/components/Button'

// Auth imports
import { getSessionData } from '@/functions/user-management'

export default async function Home () {
  const user = await getSessionData()

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}><span className='fade'>► </span>DEPLOY/23</h1>
        {
          user
            ? <Button text='Dashboard' type='button' destination='/dashboard' />
            : <Button text='Dashboard' type='login' />
        }
      </header>
      <h3 className={styles.subtitle}>Friday, November 17th – Sunday, November 19th</h3>

      <section className={styles.details}>
        <p className={styles.description}>DEPLOY/23 — <Link href={'https://compsigh.so'} target='_blank'>compsigh</Link>&apos;s first hackathon, and our biggest event of the semester. An interdisciplinary three-day event, bringing together the best minds in CS, design, and engineering to hack on a project for a weekend.</p>
        <div className={styles['video-container']}>
          <div className={styles.video}>
            <iframe width='100%' height='100%' src='https://www.youtube-nocookie.com/embed/EepB7ZA1zNw?si=y5PhTNvH_rmW3ssU' title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen></iframe>
          </div>
        </div>

        <section className={styles.eligibility}>
          <h2>Eligibility</h2>
          <p>DEPLOY/23 is geared towards CS, design, and engineering majors, but all USF students are welcome and encouraged to participate.</p>
          <p>Anyone is welcome to come hang out and hack, but <strong>only those that register for the event will be eligible for victory</strong>.</p>
          <p>Teams (no solo participants) can have a maximum of four members.</p>
          <p>All team members must present their project for the entire team to be eligible for victory.</p>
          <pre className={styles.block}>
            <code>Registration Deadline       &gt;&gt; November 17th, 6pm</code>
            <code>Team Declaration Deadline   &gt;&gt; November 17th, 11pm</code>
            <code>Project Submission Deadline &gt;&gt; November 19th, 11:30am</code>
          </pre>
        </section>

        <section className={styles.submissions}>
          <h2>Submissions</h2>
          <p>Only one team member will be required to submit the project on behalf of the team.</p>
          <p>Project submissions are not limited to a theme, and the mediums are open-ended. We suggest one of the following:</p>
          <ul>
            <li>Mobile app</li>
            <li>Web app</li>
            <li>Website</li>
            <li>Open source contribution</li>
            <li>Design system</li>
            <li>Hardware/robotics</li>
          </ul>
          <p>Please do not start working on your project (coding/designing/building, but ideas are great) until after the Opening Keynote on Friday.</p>
          <p>For any submission, <strong>before you present your project</strong>, please ensure it is open-source or otherwise publicly accessible. You&apos;re welcome to keep it private until project submissions close.</p>
          <p>Submissions don&apos;t have to be complete. In that case, what would be interesting to hear is what worked, what didn&apos;t, and how you would continue to develop the project.</p>
        </section>

        <section className={styles.presentations}>
          <h2>Presentations</h2>
          <p>When your team submits your project, you&apos;ll be asked to input:</p>
          <ul>
            <li>A team name</li>
            <li>A song to walk out on stage to (the walkout won&apos;t count against time)</li>
          </ul>
          <p>Teams will have a <strong>maximum of five minutes</strong> to present. You&apos;re welcome to spend the majority of that time on background, a live demo, or whichever way you see fit. We highly encourage creative presentation formats. Some ideas:</p>
          <ul>
            <li>Fictitious product launch trailer</li>
            <li>Skit between users and problem solvers</li>
            <li>Audience interaction (though remember to keep time in mind)</li>
          </ul>
        </section>

        <section className={styles.victory}>
          <h2>Victory</h2>
          <p>Teams fight for a People&apos;s Choice, 3rd, 2nd, and 1st Place victory.</p>
          <p>A victory is determined by the accumulation of categorical points in addition to bonuses for scalability, functionality, and collaboration. The teams with the highest total points will win their respective positions on the leaderboard.</p>
          <p>Teams will be have the opportunity to earn points for good UI/UX, Presentation, and Hardware.</p>
        </section>

        <section className={styles.judging}>
          <h2>Judging</h2>
          <p>An array of professors from the CS, design, and engineering departments will be joining us on Sunday to watch project presentations and assess them in the categories mentioned above.</p>
          <p>Event organizers will not participate directly in judging — with the exception of any tiebreakers — but may adjust points as needed.</p>
        </section>

        <section className={styles.prizes}>
          <h2>Prizes</h2>
          <p>All teammates of the winning teams will receive the prizes below:</p>
          <pre className={styles.block}>
            <code>1st Place    &gt;&gt; $100</code>
            <code>                Semester access to club AI resources</code>
            <code>                Discord Nitro</code>
            <code>                Recognition on compsigh platforms</code>
            <code>2nd Place    &gt;&gt; $50</code>
            <code>                Discord Nitro</code>
            <code>                Recognition on compsigh platforms</code>
            <code>3rd Place    &gt;&gt; $25</code>
            <code>                Recognition on compsigh platforms</code>
            <code>PPL&apos;S CHOICE &gt;&gt; Cat-shaped pillow 🐱</code>
          </pre>
          <p>Prize distribution will take place after the event.</p>
        </section>

        <section className={styles.agenda}>
          <h2>Agenda</h2>
          <p>Friday, November 17th • Harney Science Center 136</p>
          <pre className={styles.block}>
            <code>6pm     — Check-in // Registration Deadline</code>
            <code>6:30pm  — Opening Keynote</code>
            <code>7pm     — Dinner (provided)</code>
            <code>11pm    — Team Declaration Deadline</code>
          </pre>
          <p>Saturday, November 18th</p>
          <pre className={styles.block}>
            <code>TBD     — Mario Kart</code>
            <code>TBD     — Just Dance</code>
            <code>TBD     — Super Smash Bros</code>
            <code>TBD     — Kahoot</code>
          </pre>
          <p>Sunday, November 19th • McLaren Conference Center</p>
          <pre className={styles.block}>
            <code>11:30am — Project Submission Deadline</code>
            <code>12pm    — Check-in</code>
            <code>12:30pm — Presentations Begin</code>
            <code>1:30pm  — Intermission</code>
            <code>2pm     — Presentations Continue</code>
            <code>3pm     — Closing Keynote // Results Announced</code>
          </pre>
        </section>

        <section className={styles.checkin}>
          <h2>Check-in</h2>
          <p>During check-in on Friday, we&apos;ll ask for:</p>
          <ul>
            <li>Your Hacker ID, which you&apos;ll see on the dashboard after registering</li>
            <li>A picture of you — this is for presentations on Sunday, but let us know if you wouldn&apos;t be comfortable doing this</li>
          </ul>
        </section>

        <section className={styles.spaces}>
          <h2>Breakout Spaces</h2>
          <p>These rooms will be available throughout the weekend for teams to work in:</p>
          <ul>
            <li>LS 103</li>
            <li>LS 209</li>
            <li>LS 210</li>
            <li>LS 303</li>
            <li>UC 402/403</li>
            <li>UC 4th Floor Lounge</li>
          </ul>
        </section>

        <section className={styles.resources}>
          <h2>Resources</h2>
          <p>Whether it&apos;s your first-ever hackathon, or you&apos;re a seasoned hacker, we hope you&apos;ll enjoy the event. To get the most out of the experience, here are some pieces of advice compsigh members have contributed:</p>
          <blockquote>
            <p><em>Challenge yourself: in 72 hours, I learned more about React & Next.js than I did in the 3 months prior. Don&apos;t be scared to pick a stack you&apos;re not familiar with. You&apos;ll learn more than you think.</em></p>
          </blockquote>
          <blockquote>
            <p><em>Don&apos;t be afraid to mess up or not having something functioning as long as you took something out of it!</em></p>
          </blockquote>
          <blockquote>
            <p><em>Go in with a plan to learn, and have fun. It&apos;s a good place to network, meet new people, and explore different opportunities as well.</em></p>
          </blockquote>
          <blockquote>
            <p><em>Check out <a href='https://www.figma.com/community/file/1144013421600974167'>GitHub&apos;s design system for hackathons</a>.</em></p>
          </blockquote>
          <blockquote>
            <p><em>Document your process! Not just for the presentations, but for the camera roll too. :)</em></p>
          </blockquote>
        </section>
      </section>

      <footer className={styles.footer}>
        <h2>Theory will only take you so far.</h2>
        <h2>Good luck, have fun.</h2>
        {
          user
            ? <Button text='Dashboard' type='button' destination='/dashboard' />
            : <Button text='Dashboard' type='login' />
        }
      </footer>
    </main>
  )
}
