// Functions
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { checkAuth } from "@/functions/user-management"

// Components
import { Button } from "@/components/Button"

// Styles
import styles from "@/app/console/Page.module.css"

export default async function Unauthorized() {
  const session = await auth()
  const user = checkAuth(session)
  if (user)
    redirect("/console")

  return (
    <>
      <main className={styles.main}>
        <h1>Please use a USF email</h1>
        <p>You&apos;re using a non-USF email address. Click below to sign out. Then, log in again with your USF email address.</p>
        <Button type="logout">Sign out</Button>
      </main>
    </>
  )
}
