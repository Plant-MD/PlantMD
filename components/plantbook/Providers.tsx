'use client'

import { SessionProvider } from "next-auth/react"
import { SidebarProvider } from "@/components/ui/sidebar"
import PostHogProvider from "@/components/PostHogProvider"
import { Toaster } from "@/components/ui/sonner"
import Header from "../Layout/PlantBookHeader"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <SessionProvider>
        <Header />
        <SidebarProvider>
          {children}
          <Toaster />
        </SidebarProvider>
      </SessionProvider>
    </PostHogProvider>
  )
}
