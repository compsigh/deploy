// Next
import { redirect } from "next/navigation"

// Auth
import { auth } from "@/auth"
import { checkAuth } from "@/functions/user-management"

// Components
import { PlayH1 } from "@/components/PlayH1"
import { HackerCard } from "@/components/HackerCard"
import { Todos } from "@/components/Todos"

// Styles
import styles from "@/app/console/Page.module.css"
import consolePageStyles from "@/app/console/Console.module.css"

export default async function Console() {
  const session = await auth()
  const user = checkAuth(session)
  if (!session)
    redirect("/")
  if (!user)
    redirect("/console/unauthorized")

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
