import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import Layout from "@/components/Layout/layout"
import Footer from "@/components/Layout/Footer"
import Header from "@/components/Layout/Header"
import PostHogProvider from "@/components/PostHogProvider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plant MD - Diagnose Plant Disease Instantly",
  description: "PlantMD is a smart mobile application that helps farmers identify plant diseases early and suggest reliable treatment methods using advanced AI technology.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PostHogProvider>
          <Layout>
            <Header/>
            {children}
          </Layout>
          <Footer />
          <Toaster />
        </PostHogProvider>
      </body>
    </html>
  )
}