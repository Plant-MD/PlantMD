import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Footer from "@/components/Layout/Footer"
import Header from "@/components/Layout/Header"
import Providers from "@/components/plantbook/Providers"
import "@/app/(app)/globals.css"
import { AppSidebar } from "@/components/plantbook/Sidebar/Sidebar"
import { Roboto, Lato, Oswald } from "next/font/google";

const inter = Inter({ subsets: ["latin"] })
const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
  variable: "--font-roboto",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-oswald",
});

const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato',
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
          <div className={`flex ${roboto.variable} ${lato.variable} ${oswald.variable}`}>
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