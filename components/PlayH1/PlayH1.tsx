import styles from "./PlayH1.module.css"

export function PlayH1({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className={styles.title}>
        {children}
      </h1>
    </>
  )
}
