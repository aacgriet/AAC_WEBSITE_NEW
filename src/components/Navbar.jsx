// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { themeColors } from './CSSHeroAnimation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <div className="flex justify-center w-full fixed top-0 z-50 mt-[20px]">
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className={`w-[800px] transition-all duration-300 border rounded-xl ${
          scrolled ? "backdrop-blur-md bg-opacity-20 shadow-lg border-gray-600" : "border-gray-600"
        }`}
        style={{ 
          backgroundColor: scrolled ? themeColors.darkBg : 'transparent'
        }}
      >
        <div className="px-4">

          <div className="flex h-16 items-center justify-between relative">

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

            {/* Desktop navigation */}
            <div className="hidden md:flex w-full items-center justify-between">
              {/* Left links */}
              <div className="flex space-x-4">
                <Link href="/Research" className="px-3 py-1 text-white hover:bg-white/20 rounded-full transition">Research</Link>
                <Link href="/projects" className="px-3 py-1 text-white hover:bg-white/20 rounded-full transition">Projects</Link>
                <Link href="/Events" className="px-3 py-1 text-white hover:bg-white/20 rounded-full transition">Events</Link>
              </div>

              {/* Logo */}
              {/* <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
                <div 
                  className="rounded-full p-3 shadow-md hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: `0 0 15px rgba(87, 225, 255, 0.3)`
                  }}
                >
                  <Image
                    width={70}
                    height={70}
                    src="/images/logo.png"
                    alt="AAC Logo"
                    className="transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </Link> */}

              {/* Right links */}
              <div className="flex space-x-4">
                <Link href="/Achievements" className="px-3 py-1 text-white hover:bg-white/20 rounded-full transition">Achievements</Link>
                <Link href="/Administration" className="px-3 py-1 text-white hover:bg-white/20 rounded-full transition">Administration</Link>
                <Link href="/News" className="px-3 py-1 text-white hover:bg-white/20 rounded-full transition">About AAC</Link>
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
                  {["Home", "Research", "Events", "News", "Administration"].map((item, i) => (
                    <motion.div
                      key={item}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item === "Home" ? "/" : `/${item}`}
                        className="text-white text-3xl font-light tracking-wide hover:text-[#57e1ff] transition-colors"
                        onClick={() => setIsOpen(false)}
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
      </motion.nav>
    </div>
  );
};

export default Navbar;