"use client"
import React, { useState } from "react"
import PlantCalendar from "@/components/PlantCalendar/PlantCalendar"
import { useSession, signIn } from "next-auth/react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PlantCalendarPage() {
  const { status } = useSession()
  const isAuthenticated = status === "authenticated"
  const router = useRouter()
  const [showAuthPopup, setShowAuthPopup] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {isAuthenticated ? (
        <PlantCalendar />
      ) : (
        <div className="relative flex items-center justify-center min-h-[70vh]">
          {/* Glass blur overlay popup */}
          <Dialog
            open={showAuthPopup}
            onOpenChange={(open) => {
              setShowAuthPopup(open)
              if (!open) router.push('/')
            }}
          >
            <DialogContent className="backdrop-blur-xl bg-white/40 border-white/30">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-semibold text-forest-green">
                  Sign in required
                </DialogTitle>
              </DialogHeader>
              <div className="text-center text-forest-green/80">
                <p className="mb-6">Sign in to access and manage your Plant Calendar tasks.</p>
                <Button onClick={() => signIn('google')} className="bg-forest-green hover:bg-leaf-green text-white">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign in with Google
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}


