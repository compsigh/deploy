'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useRef, useEffect } from 'react'
import type { MutableRefObject } from 'react'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import type { ReadonlyURLSearchParams } from 'next/navigation'

export default function ParamsValidator ({ expect, redirect }:
  { expect: Map<string, string>, redirect: string }
) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const routerRef = useRef(router)

  useEffect(() => {
    validateParams(expect, searchParams, routerRef, redirect)
  }, [expect, searchParams, redirect])
}

function validateParams (
  expect: Map<string, string>,
  searchParams: ReadonlyURLSearchParams,
  routerRef: MutableRefObject<AppRouterInstance>,
  redirect: string
) {
  for (const [key, value] of Object.entries(expect))
    if ((searchParams.get(key) !== value) && redirect)
      routerRef.current.replace(`${redirect}`)
}
