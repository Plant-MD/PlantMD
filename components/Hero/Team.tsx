import React from "react";

export default function TeamSection() {
  return (
  <div className="relative w-full flex justify-center items-start bg-white h-80 md:h-96 overflow-visible mt-0 p-0" id="team">
      {/* Centered and contained image, fully visible and scales */}
      <img
        src="/contact.png"
        alt="Background"
        className="object-contain h-full w-full max-w-full transition-all duration-300"
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
  );
}
