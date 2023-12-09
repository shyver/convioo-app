'use client'
import { useState } from "react"
import ScenarioCreator from "../components/ScenarioCreator"
import { useRouter } from "next/navigation"

// `app/dashboard/page.js` is the UI for the `/dashboard` URL
export default function Page() {
  const router=useRouter();
  return (
    router.replace('/dashboard/library')
  )
  }