// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar transparency
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

  // Variants for the navbar animation
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeInOut" 
      }
    }
  };

  // Menu button animation variants
  const menuButtonVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 }
  };

  // Link animation variants
  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-white/20 shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
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
              <CloseIcon color="white" boxSize={6} />
            ) : (
              <HamburgerIcon color={scrolled ? "black" : "white"} boxSize={6} />
            )}
          </motion.button>

          {/* Desktop navigation */}
          <div className="hidden md:flex w-full items-center justify-between">
            <Link 
              href="/Research"
              className={`px-4 py-2 rounded-full ${scrolled ? 'text-black' : 'text-white'} hover:bg-white/20 transition duration-300`}
            >
              Research
            </Link>
            <Link 
              href="/Events"
              className={`px-4 py-2 rounded-full ${scrolled ? 'text-black' : 'text-white'} hover:bg-white/20 transition duration-300`}
            >
              Events
            </Link>
            
            {/* Logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <div className="bg-white/90 backdrop-blur-md rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  width={80}
                  height={80}
                  src="/images/logo.png"
                  alt="AAC Logo"
                  className="transition-transform hover:scale-105 duration-300"
                />
              </div>
            </Link>
            
            <div className="flex-1"></div> {/* Spacer */}
            
            <Link 
              href="/News"
              className={`px-4 py-2 rounded-full ${scrolled ? 'text-black' : 'text-white'} hover:bg-white/20 transition duration-300`}
            >
              News
            </Link>
            <Link 
              href="/Administration"
              className={`px-4 py-2 rounded-full ${scrolled ? 'text-black' : 'text-white'} hover:bg-white/20 transition duration-300`}
            >
              Administration
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#172E7C] bg-opacity-95 backdrop-blur-lg flex flex-col items-center justify-center z-40"
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
                      className="text-white text-3xl font-light tracking-wide hover:text-gray-200 transition-colors"
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
  );
};

export default Navbar;