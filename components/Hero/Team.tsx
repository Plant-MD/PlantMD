import React from "react";

export default function TeamSection() {
  return (
    <div className="relative w-full overflow-hidden" id="team">
      {/* Background Image that scales and fits */}
      <img
        src="/contact.png"
        alt="Background"
        className="w-full object-contain"
      />

      {/* Overlay positioned absolutely but scaling with image */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <img
          src="/credits.png"
          alt="Transparent Overlay"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
