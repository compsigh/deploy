"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

export function ParamClearer({ destination }: { destination: string }) {
  const router = useRouter()
  const routerRef = useRef(router)
  useEffect(() => {
    routerRef.current.replace(`${destination}`)
  }, [destination])
}
