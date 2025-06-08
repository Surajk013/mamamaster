import React from 'react';
import AboutTeamCard from '../components/AboutTeamCard';

const About = () => (
  <div className="bg-gradient-to-b from-white via-blue-50 to-white min-h-screen pb-24 pt-24">
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[420px] mb-10">
        <div className="flex-1 py-12 px-8 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 text-blue-700 flex items-center"><span className="mr-2">🎯</span> Our Mission</h3>
          <p className="mb-4 text-gray-700">At fakademy, we believe that learning should be a joyful, lifelong journey. Our platform is designed to break the mold of traditional education by making every lesson interactive, rewarding, and community-driven.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Personalized learning paths for every learner</li>
            <li>Real-world projects and challenges</li>
            <li>Continuous motivation and rewards</li>
          </ul>
        </div>
        <div className="w-0.5 bg-gray-100 hidden md:block" />
        <div className="flex-1 py-12 px-8 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-4 text-pink-700 flex items-center"><span className="mr-2">🌟</span> Our Vision</h3>
          <p className="mb-4 text-gray-700">We envision a world where anyone, anywhere, can unlock their potential through engaging, accessible, and supportive education.</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>Mentorship and peer support for all</li>
            <li>Recognition for your achievements</li>
            <li>Building a global learning community</li>
          </ul>
        </div>
      </div>
      <AboutTeamCard />
    </div>
  </div>
);

export default About; 