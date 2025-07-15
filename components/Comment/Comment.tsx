import styles from "./Comment.module.css"

export function Comment({
  type,
  children
}: {
  type: "block" | "inline"
  children: React.ReactNode
}) {
  return (
    <>
      {
        type === "block"
          ? <p className={`${styles.comment} ${styles["block-comment"]}`}>{children}</p>
          : <span className={`${styles.comment} ${styles["inline-comment"]}`}>{children}</span>
      }
    </>
  )
}
