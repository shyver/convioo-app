'use client'
import { redirect, useRouter } from "next/navigation"

// `app/dashboard/page.js` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    redirect("/dashboard/library")
  )
  }