// src/components/Navbar.jsx - Modern Premium Design with Original Size & Scroll Behavior
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
      } else if (currentPath === '/Achievements') {
        setActiveItem('Achievements');
      } else if (currentPath === '/Administration') {
        setActiveItem('Administration');
      } else if (currentPath === '/News') {
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
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const menuButtonVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 }
  };

  const linkVariants = {
    closed: { opacity: 0, y: -20, scale: 0.8 },
    open: i => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        delay: i * 0.1, 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    })
  };

  const navigationLinks = [
    { name: "Research", href: "/Research" },
    { name: "Projects", href: "/projects" },
    { name: "Events", href: "/Events" },
    { name: "Achievements", href: "/Achievements" },
    { name: "Administration", href: "/Administration" },
    { name: "About AAC", href: "/News" }
  ];

  return (
    <div className="flex justify-center w-full fixed top-0 z-50 mt-[20px]">
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`w-[900px] transition-all duration-500 ease-out rounded-2xl ${
          scrolled 
            ? "backdrop-blur-xl bg-slate-900/80 shadow-2xl shadow-blue-500/10 border border-white/20" 
            : "backdrop-blur-md bg-transparent border border-white/10"
        }`}
        style={{ 
          background: scrolled 
            ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)'
            : 'transparent'
        }}
      >
        {/* Animated background glow */}
        <div className="absolute inset-0 rounded-2xl opacity-50">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-2xl animate-pulse"></div>
        </div>

        <div className="relative px-4">
          <div className="flex h-16 items-center">
            
            {/* Mobile menu button */}
            <motion.button
              variants={menuButtonVariants}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative md:hidden z-50 group"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-10 h-10 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isOpen ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <svg className="w-5 h-5 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>

            {/* Desktop navigation - Grid layout for equal spacing */}
            <div className="hidden md:grid grid-cols-7 gap-1 w-full items-center">
              {/* Left links */}
              {navigationLinks.slice(0, 3).map((link, index) => (
                <motion.div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(link.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => handleNavClick(link.name)}
                    className={`relative px-2 py-1 font-medium transition-all duration-300 rounded-full group overflow-hidden text-center whitespace-nowrap block text-sm ${
                      activeItem === link.name 
                        ? 'text-white bg-white/10 shadow-lg' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Active/Hover indicator */}
                    <AnimatePresence>
                      {(hoveredItem === link.name || activeItem === link.name) && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                            activeItem === link.name 
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

              {/* Logo - center column */}
              <div className="flex justify-center">
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

              {/* Right links */}
              {navigationLinks.slice(3).map((link, index) => (
                <motion.div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(link.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={link.href}
                    onClick={() => handleNavClick(link.name)}
                    className={`relative px-2 py-1 font-medium transition-all duration-300 rounded-full group overflow-hidden text-center whitespace-nowrap block text-sm ${
                      activeItem === link.name 
                        ? 'text-white bg-white/10 shadow-lg' 
                        : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    
                    {/* Hover background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Active/Hover indicator */}
                    <AnimatePresence>
                      {(hoveredItem === link.name || activeItem === link.name) && (
                        <motion.div
                          layoutId="navbar-indicator-right"
                          className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                            activeItem === link.name 
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
                    {["Home", "Research", "Projects", "Events", "Achievements", "Administration", "About AAC"].map((item, i) => (
                      <motion.div
                        key={item}
                        custom={i}
                        variants={linkVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          href={item === "Home" ? "/" : item === "About AAC" ? "/News" : item === "Projects" ? "/projects" : `/${item}`}
                          className="text-white text-3xl font-light tracking-wide hover:text-[#57e1ff] transition-colors"
                          onClick={() => {
                            setIsOpen(false);
                            handleNavClick(item);
                          }}
                        >
                          {item.toUpperCase()}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;