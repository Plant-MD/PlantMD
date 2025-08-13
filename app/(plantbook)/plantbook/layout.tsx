import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import Footer from "@/components/Layout/Footer"
import Header from "@/components/Layout/Header"
import Providers from "@/components/plantbook/Providers"
import "@/app/(app)/globals.css"
import { AppSidebar } from "@/components/plantbook/Sidebar/Sidebar"

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://plant-md.github.io"),
  title: "Plant MD - Diagnose Plant Disease Instantly",
  description: "PlantMD is a smart mobile application...",
  // rest unchanged
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className={`flex ${poppins.variable}`}>
            <AppSidebar />

            <div className="flex-1 flex flex-col">
              {/* Remove overflow-auto to prevent inner scrollbar */}
              <main className="flex-1">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html >
  )
}