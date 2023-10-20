'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function ParamClearer ({ destination }) {
  const router = useRouter()
  const routerRef = useRef(router)
  useEffect(() => {
    routerRef.current.replace(`${destination}`, { shallow: true })
  }, [destination])
}
