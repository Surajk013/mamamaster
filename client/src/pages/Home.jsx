import React, { useEffect, useState } from 'react';
import AboutTeamCard from '../components/AboutTeamCard';


const words = ['fun!', 'engaging!', 'interesting!', 'rewarding!', 'easy!'];
const longestWord = words.reduce((a, b) => (a.length > b.length ? a : b), '');

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (typing) {
      if (displayed.length < words[index].length) {
        timeout = setTimeout(() => {
          setDisplayed(words[index].slice(0, displayed.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(words[index].slice(0, displayed.length - 1));
        }, 50);
      } else {
        setTyping(true);
        setIndex((prev) => (prev + 1) % words.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index]);

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            <span className="whitespace-nowrap">Make learning </span>
            <span
              className="whitespace-nowrap font-extrabold"
              style={{
                display: 'inline-block',
                color: 'transparent',
                background: 'linear-gradient(90deg, #f43f5e, #f59e42, #facc15)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                width: `${longestWord.length}ch`,
                textAlign: 'left',
                position: 'relative',
              }}
            >
              {displayed}
              <span className="align-middle animate-blink" style={{
                display: 'inline-block',
                width: '2px',
                height: '1em',
                background: 'linear-gradient(90deg, #f43f5e, #f59e42, #facc15)',
                marginLeft: '2px',
                verticalAlign: '-0.1em',
                borderRadius: '1px',
              }}></span>
            </span>
          </h1>
          <p className="mt-4 mb-4 max-w-2xl text-lg sm:text-2xl text-white/90 font-medium drop-shadow-md">
            Discover a new way to enjoy education with interactive courses, challenges, and rewards.
          </p>
        </div>
        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s steps(2, start) infinite;
          }
        `}</style>
        {/* Curved SVG divider */}
        <svg className="absolute bottom-0 left-0 w-full h-[80px] pointer-events-none" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#fff" d="M0,40 Q720,120 1440,40 V80 H0 Z"/>
        </svg>
      </section>
      <div className="relative z-10 max-w-xl mx-auto -mt-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-2 text-gray-900">About fakademy</h2>
          <p className="text-pink-600 font-semibold mb-4">Making learning fun, rewarding, and accessible for everyone.</p>
          <ul className="mb-6 text-gray-700 text-left max-w-md mx-auto space-y-2">
            <li>🎮 Gamified courses and challenges</li>
            <li>🤝 Supportive learning community</li>
            <li>🎓 Expert instructors and mentors</li>
            <li>📈 Progress tracking and rewards</li>
          </ul>
          <a href="#about-details" className="mt-2 inline-block px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition">Learn More</a>
        </div>
      </div>
      <div className="relative bg-gradient-to-b from-white via-blue-50 to-white py-24">
        <div id="about-details" className="max-w-5xl mx-auto p-0">
          <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[420px]">
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
        </div>
      </div>
      <AboutTeamCard />
      <style>{`html { scroll-behavior: smooth; }`}</style>
    </>
  );
};

export default Hero; 