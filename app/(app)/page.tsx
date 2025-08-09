import Hero from "@/components/Hero/Hero"
import About from "@/components/Hero/About"
import TeamSection from "@/components/Hero/Team"
import VideoSection from "@/components/Hero/Tutorial"
import PlantCalendar from "@/components/PlantCalendar/PlantCalendar"


export default function PlantMDLanding() {

  return (
    <div className="min-h-screen bg-green-50">

      <Hero />

      
      {/* Plant Calendar Section */}
      <div id="calendar">
        <PlantCalendar />
      </div>

      {/* About Section */}
      <div id="about">

        <About />
      </div>



      <About />

      <TeamSection />

      <VideoSection />

    </div>
  )
}
