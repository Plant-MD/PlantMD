import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Leaf, Zap, Shield, Phone, Mail } from "lucide-react"
import Hero from "@/components/Hero/Hero"
import About from "@/components/Hero/About"
import TeamSection from "@/components/Hero/Team"
import Header from "@/components/Layout/Header"
import VideoSection from "@/components/Hero/Tutorial"
import PlantCalendar from "@/components/PlantCalendar/PlantCalendar"

export default function PlantMDLanding() {

  return (
    <div className="min-h-screen bg-white">


      <Hero />
      
      {/* Plant Calendar Section */}
      <div id="calendar">
        <PlantCalendar />
      </div>

      {/* About Section */}
      <div id="about">

        <About />
      </div>

      {/* Team Section */}
      <div id="team">

        <TeamSection />
      </div>
      {/* Using The App Section */}
      

      <VideoSection />

    </div>
  )
}