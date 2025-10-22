// src/components/Navbar.jsx - Mobile Logo Removed
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { themeColors } from "./CSSHeroAnimation";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;

      if (currentPath === "/") {
        setActiveItem("Home");
      } else if (currentPath === "/Research") {
        setActiveItem("Research");
      } else if (currentPath === "/projects") {
        setActiveItem("Projects");
      } else if (currentPath === "/Events") {
        setActiveItem("Events");
      } else if (currentPath === "/News") {
        setActiveItem("News");
      } else if (currentPath === "/Achievements") {
        setActiveItem("Achievements");
      } else if (currentPath === "/Administration") {
        setActiveItem("Administration");
      } else if (currentPath === "/About") {
        setActiveItem("About AAC");
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
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const menuButtonVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  const navigationItems = [
    { name: "Research", path: "/Research" },
    { name: "Projects", path: "/projects" },
    { name: "Events", path: "/Events" },
    { name: "News", path: "/News" },
    { name: "Achievements", path: "/Achievements" },
    { name: "Administration", path: "/Administration" },
    { name: "About AAC", path: "/About" },
  ];

  return (
    <>
      {/* Mobile-only navbar - Logo Removed */}
      <div className="md:hidden">
        {/* Hamburger Button - Moves on scroll */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className={`fixed left-4 z-50 p-3 rounded-xl transition-all duration-300 ${
            scrolled ? "top-4" : "top-8"
          } ${
            isOpen
              ? "bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50"
              : "bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/50"
          } hover:shadow-xl backdrop-blur-md`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></div>

          {/* Icon with smooth animation */}
          <div className="relative">
            {isOpen ? (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </div>

          {/* Pulsing dot indicator */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"
            />
          )}
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex flex-col items-center justify-center z-40 backdrop-blur-xl"
              style={{
                background: `linear-gradient(135deg, ${themeColors.darkBg}f0 0%, ${themeColors.lightBg}f0 100%)`,
              }}
            >
              <div className="flex flex-col space-y-6 text-center">
                {[{ name: "Home", path: "/" }, ...navigationItems].map(
                  (item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={linkVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        href={item.path}
                        className="text-white text-3xl font-light tracking-wide hover:text-blue-400 transition-colors duration-300"
                        onClick={() => {
                          setIsOpen(false);
                          handleNavClick(item.name);
                        }}
                      >
                        {item.name.toUpperCase()}
                      </Link>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop navbar - Hidden on mobile */}
      <div className="hidden md:flex justify-center w-full fixed top-0 z-50 mt-[20px]">
        <motion.nav
          initial="hidden"
          animate="visible"
          variants={navVariants}
          className={`w-[900px] transition-all duration-300 border rounded-xl backdrop-blur-lg ${
            scrolled
              ? "bg-black/30 shadow-2xl border-white/30"
              : "bg-white/10 border-white/20"
          }`}
        >
          <div className="px-6">
            <div className="flex h-16 items-center relative">
              {/* Desktop navigation */}
              <div className="flex w-full items-center justify-center">
                {/* Left links */}
                <div className="flex items-center justify-end flex-1 gap-2 mr-6">
                  {navigationItems.slice(0, 4).map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="relative"
                    >
                      <Link
                        href={item.path}
                        onClick={() => handleNavClick(item.name)}
                        className={`relative px-3 py-1 font-medium transition-all duration-300 rounded-full text-center whitespace-nowrap block ${
                          activeItem === item.name
                            ? "text-white bg-white/15 shadow-lg"
                            : hoveredItem === item.name
                            ? "text-white bg-white/10 transform scale-105"
                            : "text-white/90 hover:text-white"
                        }`}
                        style={{ fontSize: "14.5px" }}
                      >
                        {item.name}

                        {(hoveredItem === item.name ||
                          activeItem === item.name) && (
                          <motion.div
                            className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                              activeItem === item.name
                                ? "bg-gradient-to-r from-blue-400 to-purple-400"
                                : "bg-gradient-to-r from-blue-400/70 to-purple-400/70"
                            }`}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Logo */}
                <div className="flex-shrink-0">
                  <Link href="/" onClick={() => handleNavClick("Home")}>
                    <div className="relative group cursor-pointer">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div
                        className="relative rounded-full p-3 shadow-2xl transition-all duration-300 group-hover:shadow-blue-500/25 group-hover:scale-105"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
                          backdropFilter: "blur(20px)",
                          border: "2px solid rgba(255, 255, 255, 0.3)",
                          boxShadow:
                            "0 8px 32px rgba(87, 225, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
                        }}
                      >
                        <Image
                          width={60}
                          height={60}
                          src="/images/logo.png"
                          alt="AAC Logo"
                          className="transition-transform duration-300 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Right links */}
                <div className="flex items-center justify-start flex-1 gap-1 ml-6">
                  {navigationItems.slice(4).map((item) => (
                    <div
                      key={item.name}
                      onMouseEnter={() => setHoveredItem(item.name)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="relative"
                    >
                      <Link
                        href={item.path}
                        onClick={() => handleNavClick(item.name)}
                        className={`relative px-3 py-1 font-medium transition-all duration-300 rounded-full text-center whitespace-nowrap text-sm block ${
                          activeItem === item.name
                            ? "text-white bg-white/15 shadow-lg"
                            : hoveredItem === item.name
                            ? "text-white bg-white/10 transform scale-105"
                            : "text-white/90 hover:text-white"
                        }`}
                      >
                        {item.name}

                        {(hoveredItem === item.name ||
                          activeItem === item.name) && (
                          <motion.div
                            className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${
                              activeItem === item.name
                                ? "bg-gradient-to-r from-blue-400 to-purple-400"
                                : "bg-gradient-to-r from-blue-400/70 to-purple-400/70"
                            }`}
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.nav>
      </div>
    </>
  );
};

export default Navbar;
