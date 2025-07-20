// src/components/Navbar.jsx - Modern design with fixed layout and routing
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { themeColors } from './CSSHeroAnimation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Set active item based on current path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      
      if (currentPath === '/') {
        setActiveItem('Home');
      } else if (currentPath === '/Research') {
        setActiveItem('Research');
      } else if (currentPath === '/projects') {
        setActiveItem('Projects');
      } else if (currentPath === '/Events') {
        setActiveItem('Events');
      } else if (currentPath === '/News') {
        setActiveItem('News');
      } else if (currentPath === '/Achievements') {
        setActiveItem('Achievements');
      } else if (currentPath === '/Administration') {
        setActiveItem('Administration');
      } else if (currentPath === '/About') {
        setActiveItem('About AAC');
      }
    }
  }, []);

  const handleNavClick = (itemName) => {
    setActiveItem(itemName);
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  const menuButtonVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 }
  };

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    })
  };

  const navigationItems = [
    { name: "Research", path: "/Research" },
    { name: "Projects", path: "/projects" },
    { name: "Events", path: "/Events" },
    { name: "News", path: "/News" },
    { name: "Achievements", path: "/Achievements" },
    { name: "Administration", path: "/Administration" },
    { name: "About AAC", path: "/About" }
  ];

  return (
    <div className="flex justify-center w-full fixed top-0 z-50 mt-[20px]">
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`w-[900px] transition-all duration-300 border rounded-xl ${
          scrolled ? "backdrop-blur-md bg-opacity-20 shadow-lg border-gray-600" : "border-gray-600"
        }`}
        style={{ 
          backgroundColor: scrolled ? themeColors.darkBg : 'transparent'
        }}
      >
        <div className="px-6">
          <div className="flex h-16 items-center relative">

            {/* Mobile menu button */}
            <motion.button
              variants={menuButtonVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
              className="md:hidden z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </motion.button>

            {/* Desktop navigation - Reduced gaps with tighter spacing */}
            <div className="hidden md:flex w-full items-center justify-center">
              {/* Left links - positioned closer to logo with slightly increased gap */}
              <div className="flex items-center justify-end flex-1 gap-2 mr-6">
                {navigationItems.slice(0, 4).map((item) => (
                  <motion.div
                    key={item.name}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.path}
                      onClick={() => handleNavClick(item.name)}
                      className={`relative px-3 py-1 font-medium transition-all duration-300 rounded-full group overflow-hidden text-center whitespace-nowrap ${
                        activeItem === item.name 
                          ? 'text-white bg-white/10 shadow-lg' 
                          : 'text-white/90 hover:text-white hover:bg-white/20'
                      }`}
                      style={{ fontSize: '14.5px' }}
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Active/Hover indicator */}
                      <AnimatePresence>
                        {(hoveredItem === item.name || activeItem === item.name) && (
                          <motion.div
                            layoutId="navbar-indicator-left"
                            className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                              activeItem === item.name 
                                ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                                : 'bg-gradient-to-r from-blue-400/70 to-purple-400/70'
                            }`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Logo - perfectly centered */}
              <div className="flex-shrink-0">
                <Link href="/" onClick={() => handleNavClick('Home')}>
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative group cursor-pointer"
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Logo container */}
                    <div 
                      className="relative rounded-full p-3 shadow-2xl transition-all duration-500 group-hover:shadow-blue-500/25"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 8px 32px rgba(87, 225, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      <Image
                        width={60}
                        height={60}
                        src="/images/logo.png"
                        alt="AAC Logo"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      {/* Inner glow */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </motion.div>
                </Link>
              </div>

              {/* Right links - positioned closer to logo with reduced gap */}
              <div className="flex items-center justify-start flex-1 gap-1 ml-6">
                {navigationItems.slice(4).map((item) => (
                  <motion.div
                    key={item.name}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      href={item.path}
                      onClick={() => handleNavClick(item.name)}
                      className={`relative px-3 py-1 font-medium transition-all duration-300 rounded-full group overflow-hidden text-center whitespace-nowrap text-sm ${
                        activeItem === item.name 
                          ? 'text-white bg-white/10 shadow-lg' 
                          : 'text-white/90 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      
                      {/* Active/Hover indicator */}
                      <AnimatePresence>
                        {(hoveredItem === item.name || activeItem === item.name) && (
                          <motion.div
                            layoutId="navbar-indicator-right"
                            className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                              activeItem === item.name 
                                ? 'bg-gradient-to-r from-blue-400 to-purple-400' 
                                : 'bg-gradient-to-r from-blue-400/70 to-purple-400/70'
                            }`}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "100vh" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex flex-col items-center justify-center z-40"
                style={{ 
                  backgroundColor: `rgba(${parseInt(themeColors.darkBg.slice(1, 3), 16)}, ${parseInt(themeColors.darkBg.slice(3, 5), 16)}, ${parseInt(themeColors.darkBg.slice(5, 7), 16)}, 0.95)`,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="flex flex-col space-y-6 text-center">
                  {[
                    { name: "Home", path: "/" },
                    { name: "Research", path: "/Research" },
                    { name: "Projects", path: "/projects" },
                    { name: "Events", path: "/Events" },
                    { name: "News", path: "/News" },
                    { name: "Achievements", path: "/Achievements" },
                    { name: "Administration", path: "/Administration" },
                    { name: "About AAC", path: "/About" }
                  ].map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item.path}
                        className="text-white text-3xl font-light tracking-wide hover:text-[#57e1ff] transition-colors"
                        onClick={() => {
                          setIsOpen(false);
                          handleNavClick(item.name);
                        }}
                      >
                        {item.name.toUpperCase()}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;