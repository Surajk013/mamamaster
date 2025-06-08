import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Dynamic classes based on route
  const linkClass = isHome
    ? 'text-white hover:text-blue-300 font-medium'
    : 'text-gray-800 hover:text-blue-600 font-medium';
  const logoClass = isHome
    ? 'text-blue-400'
    : 'text-blue-600';
  const dividerClass = isHome ? 'text-white' : 'text-gray-800';
  const mobileMenuBg = isHome ? 'bg-slate-900/90' : 'bg-white bg-opacity-95';
  const mobileMenuBorder = isHome ? 'border-slate-700' : 'border-gray-300';

  return (
    <nav className="absolute top-0 left-0 w-full z-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className={`flex-shrink-0 flex items-center text-2xl font-bold ${logoClass}`}>
            <img src="/logo.jpeg" alt="fakademy logo" className="h-8 w-8 mr-2 rounded-full object-cover" />
            <Link to="/">fakademy</Link>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/about" className={linkClass}>About Us</Link>
            <Link to="/courses" className={linkClass}>Courses</Link>
            <Link to="/testimonials" className={linkClass}>Testimonials</Link>
            <Link to="/contact" className={linkClass}>Contact Us</Link>
            <div className="ml-6">
              <Link to="/signin" className={linkClass}>Sign-in</Link>
              <span className={`mx-1 ${dividerClass}`}>/</span>
              <Link to="/register" className={linkClass}>Register</Link>
            </div>
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={linkClass + ' focus:outline-none'}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden shadow-lg px-4 pt-2 pb-4 space-y-2 ${mobileMenuBg}`}>
          <Link to="/about" className={`block ${linkClass}`}>About Us</Link>
          <Link to="/courses" className={`block ${linkClass}`}>Courses</Link>
          <Link to="/testimonials" className={`block ${linkClass}`}>Testimonials</Link>
          <Link to="/contact" className={`block ${linkClass}`}>Contact Us</Link>
          <div className={`pt-2 border-t ${mobileMenuBorder}`}>
            <Link to="/signin" className={linkClass}>Sign-in</Link>
            <span className={`mx-1 ${dividerClass}`}>/</span>
            <Link to="/register" className={linkClass}>Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 