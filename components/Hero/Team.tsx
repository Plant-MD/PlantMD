import React from "react";

export default function TeamSection() {
  return (
    <div className="relative w-full overflow-hidden" id="team">
      {/* Background Image that scales and fits */}
      <img
        src="/contact.png"
        alt="Background"
        className="w-full h-auto object-contain max-h-screen"
        style={{ display: 'block', margin: '0 auto' }}
      />
    </div>
  );
}
