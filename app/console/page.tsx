// Functions
import { redirect } from "next/navigation"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Components
import { Todos } from "@/components/Todos"
import { PlayH1 } from "@/components/PlayH1"
import { HackerCard } from "@/components/HackerCard"

// Styles
import styles from "@/app/console/Page.module.css"
import consolePageStyles from "@/app/console/Console.module.css"

export default async function Console() {
  const session = await auth()
  if (!session)
    redirect("/")
  const authed = checkAuth(session)
  if (!authed)
    redirect("/console/unauthorized")
  const user = authed

  return (
    <main className={styles.main}>
      <PlayH1>Welcome, Hacker</PlayH1>
      <Todos user={user} />
      <div className={consolePageStyles["card-wrapper"]}>
        <HackerCard user={user} />
      </div>
    </main>
  )
}
