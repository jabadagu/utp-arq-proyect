import type React from "react"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen">
      <Sidebar role={(session.user as any).role} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={session.user as any} />
        <main className="flex-1 overflow-y-auto p-6 bg-muted/30">{children}</main>
      </div>
    </div>
  )
}
