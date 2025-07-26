"use client";
import Link from "next/link";
import React from "react";
import DragOverComponent from "../shared/DragOver";
import Image from "next/image";

function Hero() {
  const handleFileDrop = (files: FileList) => {
    console.log("Files dropped or selected:", files);
  };

  return (
    <section className="relative flex min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute right-10 top-40 h-64 w-64 animate-pulse rounded-full bg-emerald-100 opacity-30 mix-blend-multiply blur-xl delay-1000" />
      </div>

      {/* Pattern Decorations */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute left-12 top-24" width="100" height="100" viewBox="0 0 100 100">
          <defs>
            <pattern id="leaves1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10 4 Q14 8 10 12 Q6 8 10 4" fill="#16a34a" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves1)" />
        </svg>
        <svg className="absolute bottom-24 right-12" width="80" height="80" viewBox="0 0 80 80">
          <defs>
            <pattern id="leaves2" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
              <circle cx="7.5" cy="7.5" r="1.5" fill="#15803d" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leaves2)" />
        </svg>
      </div>

      {/* Dancing GIF
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWJ6MXM5b2syZnduaDA5MjV5c2xkdnF3cjRja2l3cTlja3JoMzNxYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/n6P4pwFUUBJCcAQnTY/giphy.gif"
        alt="Dancing Duck"
        className="w-32 md:w-48 h-auto rounded-lg absolute right-[200px] top-10 z-10"
      /> */}

      {/* Main Content Split */}
      <div className="flex w-full h-screen">
        {/* Left - Full image cover */}
        <div className="w-1/2 relative hidden md:block">
          <Image
            src="/hero_bg.png"
            alt="temp_background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right - Upload Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 relative z-10">
          {/* Header Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center rounded-full border border-green-200/50 bg-white/90 px-4 py-2 shadow-md backdrop-blur-sm">
              <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-xs font-semibold text-green-800">
                AI-Powered Plant Disease Detection
              </span>
            </div>
          </div>

          {/* Drag and Drop */}
          <DragOverComponent
            onDrop={handleFileDrop}
            title="Upload Plant Photo"
            subtitle="Get instant diagnosis & treatment"
          />

          {/* Terms and Conditions */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By uploading, you agree to our{" "}
              <Link href="/terms" className="text-green-600 underline hover:text-green-700">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/privacy" className="text-green-600 underline hover:text-green-700">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
