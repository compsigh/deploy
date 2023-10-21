'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'

export default function ParamsValidator ({ expect, redirect }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const routerRef = useRef(router)

  useEffect(() => {
    validateParams(expect, searchParams, routerRef.current, redirect)
  }, [expect, searchParams, redirect])
}

function validateParams (expect, searchParams, router, redirect) {
  for (const [key, value] of Object.entries(expect))
    if ((searchParams.get(key) !== value) && redirect)
      router.replace(`${redirect}`, { shallow: true })
}
