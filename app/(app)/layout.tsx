import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { EnhancedToastProvider } from "@/hooks/useEnhancedToast"
import Layout from "@/components/Layout/layout"
import Footer from "@/components/Layout/Footer"
import Header from "@/components/Layout/Header"
import PostHogProvider from "@/components/PostHogProvider"
import "./globals.css"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
})

export const metadata: Metadata = {
  metadataBase: new URL("https://plant-md.github.io"),
  title: "Plant MD - Diagnose Plant Disease Instantly",
  description:
    "PlantMD is a smart mobile application that helps farmers identify plant diseases early and suggest reliable treatment methods using advanced AI technology.",
  keywords: "plant disease, agriculture, farming, AI diagnosis, plant health, crop management",
  authors: [{ name: "Plant MD Team" }],
  creator: "Plant MD",
  publisher: "Plant MD",
  openGraph: {
    title: "Plant MD - Diagnose Plant Disease Instantly",
    description: "Smart mobile application for early plant disease identification using AI technology.",
    url: "/",
    siteName: "Plant MD",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Plant MD - AI Plant Disease Diagnosis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plant MD - Diagnose Plant Disease Instantly",
    description: "Smart mobile application for early plant disease identification using AI technology.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="apple-mobile-web-app-title" content="Plant MD" />
      </head>
      <body className={poppins.className}>
        <PostHogProvider>
          <EnhancedToastProvider>
            <Layout>
              <Header/>
              {children}
            </Layout>
            <Footer />
            <Toaster />
          </EnhancedToastProvider>
        </PostHogProvider>
      </body>
    </html>
  )
}