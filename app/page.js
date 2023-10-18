import styles from './page.module.css'

export default function Home () {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}><span className={styles.playbutton}>► </span>DEPLOY/23</h1>

      <section className={styles.details}>
        <p className={styles.description}>DEPLOY/23 — compsigh&apos;s first hackathon, and our biggest event of the semester. An interdisciplinary three-day event, bringing together the best minds in CS, design, and engineering to hack on a project for a weekend.</p>
        <section className={styles.eligibility}>
          <h2>Eligibility</h2>
          <p>DEPLOY/23 is geared towards CS, design, and engineering majors, but all USF students are welcome to participate.</p>
          <p>Teams (no solo participants) can have a maximum of four members.</p>
          <p><strong>All team members must present</strong> their projects in order for the entire team to be eligible for victory. Only one team member will be required to submit the project on behalf of the team.</p>
          <div className='block'>
            <p>Registration Deadline</p>
            <p>&gt;&gt;</p>
            <p>October 27th, 6pm</p>
          </div>
          <div className='block'>
            <p>Team Declaration Deadline</p>
            <p>&gt;&gt;</p>
            <p>October 27th, 11pm</p>
          </div>
        </section>

        <section className={styles.submissions}>
          <h2>Submissions</h2>
          <p>Project submissions are not limited to a theme, and the mediums are open-ended. We suggest one of the following:</p>
          <ul>
            <li>Mobile app</li>
            <li>Web app</li>
            <li>Website</li>
            <li>Open source contribution</li>
            <li>Design system</li>
            <li>Hardware/robotics</li>
          </ul>
          <p>For any submission, <strong>before you present your project</strong>, please ensure it is open-source or otherwise publicly accessible. You&apos;re welcome to keep it private until after project submissions close.</p>
        </section>

        <section className={styles.presentations}>
          <h2>Presentations</h2>
          <p>Teams will have a maximum of five minutes to present. Teams are welcome to spend the majority of that time on background, a live demo, or whichever way they see fit. We highly encourage creative presentation formats. Some ideas:</p>
          <ul>
            <li>Fictitious product launch trailer</li>
            <li>Skit between users and problem solvers</li>
            <li>Audience interaction (though remember to keep time in mind)</li>
          </ul>
          <p>When teams submit their projects, they&apos;ll be able to input:</p>
          <ul>
            <li>A team name</li>
            <li>A song to walk out on stage to (the walkout won&apos;t count against time)</li>
          </ul>
        </section>

        <section className={styles.victory}>
          <h2>Victory</h2>
          <p>Teams fight for a People&apos;s Choice, 3rd, 2nd, and 1st Place victory.</p>
          <p>A victory is determined by the accumulation of categorical points in addition to bonuses for scalability, functionality, and collaboration. The teams with the highest total points will win their respective positions on the leaderboard.</p>
          <p>Teams will be have the opportunity to earn points for good UI/UX, Presentation, and Hardware.</p>
        </section>

        <section className={styles.prizes}>
          <h2>Prizes</h2>
          <p>All teammates of the winning teams will receive the prizes below:</p>
          <div className='block'>
            <p>1st Place</p>
            <p>&gt;&gt;</p>
            <p>
              $100
              <br />
              Recognition on compsigh platforms
              <br />
              Discord Nitro
              <br />
              <strong>Access to club AI resources for the rest of the semester</strong>
            </p>
          </div>
          <div className='block'>
            <p>2nd Place</p>
            <p>&gt;&gt;</p>
            <p>
              $50
              <br />
              Recognition on compsigh platforms
              <br />
              Discord Nitro
            </p>
          </div>
          <div className='block'>
            <p>3rd Place</p>
            <p>&gt;&gt;</p>
            <p>
              $25
              <br />
              Recognition on compsigh platforms
            </p>
          </div>
          <div className='block'>
            <p>PPL&apos;S CHOICE</p>
            <p>&gt;&gt;</p>
            <p>
              Cat-shaped pillow 🐱
            </p>
          </div>
        </section>

        <section className={styles.agenda}>
          <h2>Agenda</h2>
          <p>Friday, October 27th</p>
          <div className='block'>
            <p>6pm</p>
            <p>—</p>
            <p>Check-in // Registration Deadline</p>
          </div>
          <div className='block'>
            <p>6:30pm</p>
            <p>—</p>
            <p>Opening Ceremony</p>
          </div>
          <div className='block'>
            <p>7pm</p>
            <p>—</p>
            <p>Dinner</p>
          </div>
          <div className='block'>
            <p>8pm</p>
            <p>—</p>
            <p>Hacking Begins</p>
          </div>
          <div className='block'>
            <p>11pm</p>
            <p>—</p>
            <p>Team Declaration Deadline</p>
          </div>
          <p>Saturday, October 28th</p>
          <div className='block'>
            <p>TBD</p>
            <p>—</p>
            <p>Mario Kart</p>
          </div>
          <div className='block'>
            <p>TBD</p>
            <p>—</p>
            <p>Just Dance</p>
          </div>
          <div className='block'>
            <p>TBD</p>
            <p>—</p>
            <p>Super Smash Bros</p>
          </div>
          <div className='block'>
            <p>TBD</p>
            <p>—</p>
            <p>Kahoot</p>
          </div>
          <p>Sunday, October 29th</p>
          <div className='block'>
            <p>1pm</p>
            <p>—</p>
            <p>Check-in // Project Submission Deadline</p>
          </div>
          <div className='block'>
            <p>1:30pm</p>
            <p>—</p>
            <p>Presentations Begin</p>
          </div>
          <div className='block'>
            <p>2:30pm</p>
            <p>—</p>
            <p>Intermission</p>
          </div>
          <div className='block'>
            <p>3pm</p>
            <p>—</p>
            <p>Presentations Continue</p>
          </div>
          <div className='block'>
            <p>4pm</p>
            <p>—</p>
            <p>Results Announced</p>
          </div>
        </section>

        <section className={styles.spaces}>
          <h2>Breakout Spaces</h2>
          <p>The following rooms will be available throughout the weekend for teams to work in:</p>
          <ul>
            <li>LS 103</li>
            <li>LS 209</li>
            <li>LS 210</li>
            <li>LS 303</li>
            <li>UC 4th Floor Lounge</li>
            <li>UC 402/403</li>
          </ul>
        </section>

        <section className={styles.resources}>
          <h2>Remarks & Resources</h2>
          <p>Whether it&apos;s your first-ever hackathon, or you&apos;re a seasoned hacker, we hope you&apos;ll enjoy the event. To get the most out of the experience, here are a few remarks & resources we&apos;d like to leave you with:</p>
          <blockquote>
            <p>Challenge yourself: in 72 hours, I learned more about React & Next.js than I did in the 3 months prior. Don&apos;t be scared to pick a stack you&apos;re not familiar with. You&apos;ll learn more than you think.</p>
            <p>— <strong>Edward</strong></p>
          </blockquote>
          <blockquote>
            <p>Check out <a href='https://www.figma.com/community/file/1144013421600974167'>GitHub&apos;s design system for hackathons</a>.</p>
            <p>— <strong>Edward</strong></p>
          </blockquote>
          <blockquote>
            <p>Document your process! Not just for the presentations, but for the camera roll too. :)</p>
            <p>— <strong>Edward</strong></p>
          </blockquote>
        </section>
      </section>
    </main>
  )
}
