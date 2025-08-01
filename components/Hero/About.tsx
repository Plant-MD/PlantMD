import { Leaf, Shield, Zap } from 'lucide-react';
import React from 'react';

function About() {
  return (
    <section
      id="about"
      className="bg-green-50 px-4 sm:px-6 py-12 sm:py-20 flex flex-col justify-center ju items-center text-center min-h-screen "
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
          About PlantMD
        </h2>
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-12 font-roboto">
          PlantMD is a smart mobile application that helps farmers identify plant
          diseases early and suggests reliable treatment methods. Using advanced
          image recognition and data-driven insights, it provides quick, accurate
          diagnoses right from a phone. Our goal is to support sustainable farming
          by reducing crop loss and making disease management simple, fast, and
          accessible to farmers everywhere.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-3 max-w-4xl w-full">
        {features.map(({ icon: Icon, title }, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-3 transition-transform duration-300 hover:scale-105"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-plant-dark rounded-xl flex items-center justify-center shadow-md">
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
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
