'use client'

import {
  useRouter,
  useSearchParams,
  type ReadonlyURLSearchParams
} from 'next/navigation'

import {
  useEffect,
  useRef,
  type MutableRefObject
} from 'react'

import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

function validateParams(
  expect: Record<string, string>,
  searchParams: ReadonlyURLSearchParams,
  routerRef: MutableRefObject<AppRouterInstance>,
  redirect: string
) {
  for (const [key, value] of Object.entries(expect)) {
    if ((searchParams.get(key) !== value) && redirect)
      routerRef.current.replace(`${redirect}`)
  }
}

export default function ParamsValidator({
  expect,
  redirect
}: {
  expect: Record<string, string>
  redirect: string
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const routerRef = useRef(router)

  useEffect(() => {
    validateParams(expect, searchParams, routerRef, redirect)
  }, [expect, searchParams, redirect])

  return null
}
