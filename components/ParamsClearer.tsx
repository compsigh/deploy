'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import type { Route } from 'next'

export default function ParamClearer ({ destination }: { destination: string }) {
  const router = useRouter()
  const routerRef = useRef(router)
  useEffect(() => {
    routerRef.current.replace(`${destination}` as Route)
  }, [destination])
}
