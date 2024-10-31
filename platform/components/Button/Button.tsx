"use client"

// Next
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { MouseEventHandler } from "react"

// Auth
import { signIn, signOut } from "next-auth/react"

// Styles
import styles from "./Button.module.css"

export function Button({
  children,
  type,
  destination
}: {
  children: React.ReactNode
  type?: "login" | "logout" | "link" | "submit"
  destination?: string
}) {
  let onClick: MouseEventHandler<HTMLButtonElement>
  const router = useRouter()
  if (type === "login")
    onClick = () => signIn("google", { callbackUrl: "/console" })
  else if (type === "logout")
    onClick = () => signOut({ callbackUrl: "/" })
  else if (destination)
    onClick = () => router.push(destination)
  else
    onClick = () => {}

  if (type === "link")
    return <Link href={`${destination}`}>{children}</Link>

  if (type === "submit") {
    return (
      <button type="submit" className={styles.button}>
        {children}
      </button>
    )
  }

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
