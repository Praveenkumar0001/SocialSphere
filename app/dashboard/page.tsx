import { Suspense } from "react"
import DashboardSkeleton from "./dashboard-skeleton"
import ClientWrapper from "./client-wrapper"

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <ClientWrapper />
    </Suspense>
  )
}
