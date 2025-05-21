"use client"

import dynamic from "next/dynamic"
import DashboardSkeleton from "./dashboard-skeleton"

// Dynamic import with ssr: false must be in a client component
const DashboardClient = dynamic(() => import("./dashboard-client"), {
  ssr: false,
  loading: () => <DashboardSkeleton />,
})

export default function ClientWrapper() {
  return <DashboardClient />
}
