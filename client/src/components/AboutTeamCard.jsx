import React from 'react';

const AboutTeamCard = () => (
  <div className="max-w-5xl mx-auto p-10 bg-white rounded-2xl shadow-xl text-center">
    <h2 className="text-3xl font-bold mb-6 text-blue-800">Meet the Team Behind fakademy</h2>
    <p className="mb-8 text-gray-700 text-lg">fakademy was founded by passionate educators and technologists who believe in the power of joyful, community-driven learning. Our team brings together years of experience in teaching, curriculum design, and software development to create a platform that truly puts learners first.</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-blue-100 mb-3" />
        <div className="font-semibold text-gray-900">Sathwik T S</div>
        <div className="text-gray-500 text-sm">Founder</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-pink-100 mb-3" />
        <div className="font-semibold text-gray-900">Sudhanshu shekhar</div>
        <div className="text-gray-500 text-sm">Tech Lead</div>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-yellow-100 mb-3" />
        <div className="font-semibold text-gray-900">Kapsa Suraj Singh</div>
        <div className="text-gray-500 text-sm">Curriculam Lead</div>
      </div>
    </div>
  </div>
);

export default AboutTeamCard; 