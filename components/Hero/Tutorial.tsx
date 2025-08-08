"use client";

import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="bg-green-50 overflow-hidden md:min-h-screen">
      <div className="max-w-5xl rounded-md m-auto relative z-10 my-5 md:my-20">

        {/* Video Container */}
        <div className="relative z-10 overflow-hidden rounded-xl aspect-video shadow-md">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1"
            title="YouTube video"
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}