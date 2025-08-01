import Hero from "@/components/Hero/Hero"
import About from "@/components/Hero/About"
import TeamSection from "@/components/Hero/Team"
import VideoSection from "@/components/Hero/Tutorial"


export default function PlantMDLanding() {

  return (
    <div className="min-h-screen bg-green-50">

      <Hero />

      <About />

      <TeamSection />

      <VideoSection />

    </div>
  )
}