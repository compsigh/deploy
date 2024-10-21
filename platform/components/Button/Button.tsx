"use client"

// Next
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { MouseEventHandler } from "react"

// Auth
import { signIn, signOut } from "next-auth/react"

// Styles
import styles from "./Button.module.css"

export function Button({
  text,
  type,
  destination
}: {
  text: string
  type: string
  destination?: string
}) {
  let onClick: MouseEventHandler<HTMLButtonElement>
  const router = useRouter()
  if (type === "login")
    onClick = () => signIn("google", { callbackUrl: "/console" })
  else if (type === "logout")
    onClick = () => signOut()
  else if (type === "button" && destination)
    onClick = () => router.push(destination)
  else
    onClick = () => {}

  if (type === "link")
    return <Link href={`${destination}`}>{text}</Link>

  if (type === "button") {
    return (
      <button className={styles.button} onClick={onClick}>
        {text}
      </button>
    )
  }

  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  )
}

