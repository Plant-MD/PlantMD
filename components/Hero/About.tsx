import { Leaf, Shield, Zap } from 'lucide-react';
import React from 'react';

function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center text-center min-h-screen relative overflow-hidden"
    >
      {/* Soft Glowing Blob Background */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0 delay-1000" />

      {/* Content Wrapper */}
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-emerald-900 drop-shadow-sm mb-6">
          About <span className="text-green-950">PlantMD</span>
        </h2>
        <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-12 font-medium tracking-wide">
          PlantMD is a smart mobile application that helps farmers identify plant
          diseases early and suggests reliable treatment methods. Powered by
          advanced image recognition and data-driven insights, it offers quick,
          accurate diagnoses right from your phone. Our mission is to promote
          sustainable farming by reducing crop loss and simplifying disease
          management for every farmer.
        </p>
      </div>

      {/* Features */}
      <div className="grid gap-8 sm:grid-cols-3 max-w-5xl w-full px-4 sm:px-0 z-10">
        {features.map(({ icon: Icon, title }, index) => (
          <div
            key={index}
            className="group flex flex-col items-center p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-green-200 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md group-hover:rotate-6 transform transition duration-300">
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-emerald-900 mt-4 group-hover:text-green-700 transition">
              {title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    icon: Zap,
    title: 'AI Powered',
  },
  {
    icon: Leaf,
    title: 'Instant Feedback',
  },
  {
    icon: Shield,
    title: 'Solution & Warning',
  },
];

export default About;
