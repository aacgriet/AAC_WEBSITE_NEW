// src/pages/index.js - Enhanced Breathing Effect to Match Footer
import Layout from "@/components/Layout";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { useRef } from "react";
import { BannerContext } from "@/context/BannerContext";
import { useDatabase } from "@/hooks/useDatabase";
import { useDatabase } from "@/hooks/useDatabase";
import {
  FaCalendar,
  FaEnvelope,
  FaLightbulb,
  FaRocket,
  FaUsers,
} from "react-icons/fa";

// Registration Banner Component
const RegistrationBanner = ({ bannerRef }) => {
  const scrollToOpulence = () => {
    const el = document.getElementById('opulence-2026');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <motion.div
      ref={bannerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full bg-slate-900 border-b border-white/10 shadow shadow-black/20 py-2.5"
    >
      <div className="flex items-center justify-center px-3 gap-2 md:gap-4">
        {/* Pulsing live dot */}
        <div className="relative flex items-center justify-center flex-shrink-0">
          <div className="absolute w-4 h-4 bg-green-400/60 rounded-full animate-ping opacity-40"></div>
          <div className="relative w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
        </div>

        {/* Main text — mobile condensed, desktop full */}
        <p className="text-white/90 text-xs sm:text-sm md:text-base font-medium text-center flex-1 leading-tight">
          <span className="hidden md:inline">Registrations Open for </span>
          <span className="font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">Opulence 2026</span>
          <span className="hidden md:inline">!</span>
          <span className="hidden md:inline"> — Join us for workshops, tech talks &amp; competitions!</span>
        </p>

        {/* CTA Button */}
        <Link href="/opulence"  className="flex-shrink-0">
        <button
          className="flex-shrink-0 flex items-center gap-1 px-3 py-1 sm:px-4 sm:py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/30"
        >
          Register Now
          <span className="text-xs">→</span>
        </button></Link>



        
      </div>
    </motion.div>
  );
};

const Home = () => {
  const bannerRef = useRef(null);
  const { data: dbEvents } = useDatabase("events");

  // Default events for fallback
  const defaultEvents = [
    {
      title: "Opulence 2026",
      date: "2026",
      gradient: "from-blue-500 to-indigo-600",
      description:
        "AAC's flagship technical symposium featuring workshops and competitions",
      icon: "✨",
      highlights: ["Tech Talks", "Workshops", "Competitions"],
      link: "/opulence",
    },
    {
      title: "AAC Project Expo 2026",
      date: "2026",
      gradient: "from-purple-500 to-pink-600",
      description:
        "Showcase of innovative student projects across all technology domains",
      icon: "🚀",
      highlights: ["Live Demos", "Expert Judges", "Awards & Recognition"],
    },
  ];

  // Filter for upcoming events from database
  const upcomingDbEvents = (dbEvents || [])
    .filter((event) => event.status === "upcoming")
    .map((event) => {
      // Helper to choose icon based on title
      const getIcon = (title) => {
        const t = title.toLowerCase();
        if (t.includes("expo")) return "🚀";
        if (t.includes("workshop")) return "🛠️";
        if (t.includes("talk") || t.includes("seminar")) return "🎤";
        if (t.includes("hackathon") || t.includes("code")) return "💻";
        return "✨";
      };

      // Helper to choose gradient based on title
      const getGradient = (title) => {
        const t = title.toLowerCase();
        if (t.includes("expo")) return "from-purple-500 to-pink-600";
        if (t.includes("workshop")) return "from-emerald-500 to-teal-600";
        return "from-blue-500 to-indigo-600";
      };

      return {
        title: event.title || event.event,
        date: event.date,
        gradient: event.gradient || getGradient(event.title || event.event),
        description: event.description,
        icon: event.icon || getIcon(event.title || event.event),
        highlights: event.highlights || ["Upcoming Event", "Register Now"],
        link: event.ctaLink || event.path,
      };
    });

  // Use DB events if available, otherwise use defaults
  const events = upcomingDbEvents.length > 0 ? upcomingDbEvents : defaultEvents;

  // Unified animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Enhanced Global Breathing Effect - Consistent with Footer */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary breathing blobs - more intense like footer */}
        <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[100%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
        <div className="absolute top-[40%] -left-[25%] w-[70%] h-[70%] bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-[70%] -right-[15%] w-[65%] h-[65%] bg-gradient-to-br from-purple-400/10 to-rose-600/10 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        <div className="absolute top-[100%] left-[10%] w-[50%] h-[50%] bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>

        {/* Additional subtle breathing effects */}
        <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-yellow-400/8 to-orange-600/8 rounded-full blur-3xl animate-pulse animation-delay-1500"></div>
        <div className="absolute top-[80%] right-[30%] w-[45%] h-[45%] bg-gradient-to-br from-pink-400/8 to-purple-600/8 rounded-full blur-3xl animate-pulse animation-delay-3500"></div>
      </div>

      {/* Registration Banner */}
      <RegistrationBanner bannerRef={bannerRef} />

      <BannerContext.Provider value={bannerRef}>

      <Layout>
          <Head>
            <title>AAC - Advanced Academic Center | GRIET</title>
            <meta
              name="description"
              content="Advanced Academic Center (AAC) is an inter-disciplinary research centre at GRIET, Hyderabad focused on innovation and research."
            />
          </Head>

          {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center">
            {/* Logo with enhanced breathing effect */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/15 to-pink-600/15 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
                <Image 
                  src="/images/logo.png"
                  height={150} 
                  width={150} 
                  alt="AAC Logo" 
                  className="relative z-10 drop-shadow-2xl"
                />
              </div>
            </motion.div> */}

            {/* Enhanced badge with breathing effect */}

            {/* <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse relative z-10"></div>
              <span className="text-sm font-medium relative z-10">Innovation • Research • Excellence</span>
            </motion.div> */}

            {/* Modern Title Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Advanced Academic{" "}
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Center
                </span>
              </h1>

              {/* Subtitle with modern styling */}
              <div className="relative">
                <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
                  <span className="bg-gradient-to-r from-blue-200 to-indigo-300 bg-clip-text text-transparent">
                    Gokaraju Rangaraju Institute of Engineering and Technology
                  </span>
                </h2>

                {/* Decorative line */}
                <div className="flex justify-center mt-6 mb-2">
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-full"></div>
                </div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              An interdisciplinary research hub where creativity, innovation,
              and excellence converge to shape the future
            </motion.p>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <button
                onClick={scrollToNextSection}
                className="group/btn px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore More
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 opacity-0 animate-pulse"></div>
              </button>

              <Link
                href="/Research"
                className="px-8 py-4 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">View Research</span>
              </Link>
            </motion.div>

            {/* Enhanced decorative dots */}
            <div className="flex justify-center items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500 shadow-lg shadow-purple-500/50"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000 shadow-lg shadow-indigo-500/50"></div>
            </div>
          </div>

          {/* Enhanced down indicator */}
          <div
            className="absolute bottom-8 left-0 right-0 flex justify-center z-10 animate-bounce cursor-pointer group"
            onClick={scrollToNextSection}
          >
            <div className="w-8 h-8 text-white opacity-80 hover:opacity-100 transition-all duration-300 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="relative z-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* About Section with enhanced breathing */}
        <section className="relative py-24 px-4 overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto max-w-6xl relative z-10"
          >
            <div className="text-center mb-16">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-600/20 opacity-0 animate-pulse"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse relative z-10"></div>
                <span className="text-sm font-medium relative z-10">
                  About AAC
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
                  Pushing Boundaries of
                </span>{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Innovation
                </span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed"
              >
                We are an interdisciplinary research center committed to
                excellence in teaching, learning, and research, bringing
                together experts to address innovative problem areas.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex justify-center items-center gap-3 mt-8"
              >
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-500 shadow-lg shadow-pink-500/50"></div>
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse animation-delay-1000 shadow-lg shadow-rose-500/50"></div>
              </motion.div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  number: "50+",
                  label: "Research Projects",
                  icon: <FaLightbulb />,
                  color: "from-blue-500 to-blue-600",
                },
                {
                  number: "100+",
                  label: "Students Involved",
                  icon: <FaUsers />,
                  color: "from-purple-500 to-purple-600",
                },
                {
                  number: "10+",
                  label: "Published Papers",
                  icon: <FaRocket />,
                  color: "from-pink-500 to-pink-600",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 p-8 text-center"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color
                      .replace("to-", "to-")
                      .replace(
                        "from-",
                        "from-"
                      )}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                  ></div>

                  {/* Enhanced breathing effect for cards */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color}/5 animate-pulse rounded-2xl`}
                  ></div>

                  <div className="relative z-10">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                      <span className="text-white text-xl relative z-10">
                        {stat.icon}
                      </span>
                    </div>

                    <div className="text-4xl font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* What We Do Section - Enhanced */}
        <section className="relative py-24 px-4 overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto max-w-6xl relative z-10"
          >
            <div className="text-center mb-16">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 opacity-0 animate-pulse"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse relative z-10"></div>
                <span className="text-sm font-medium relative z-10">
                  What We Do
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-emerald-100 to-teal-200 bg-clip-text text-transparent">
                  Our Focus
                </span>{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  Areas
                </span>
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="flex justify-center items-center gap-3 mt-8"
              >
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse animation-delay-500 shadow-lg shadow-teal-500/50"></div>
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse animation-delay-1000 shadow-lg shadow-cyan-500/50"></div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Research & Innovation",
                  description:
                    "Cutting-edge research projects that push the boundaries of technology and knowledge",
                  icon: "🔬",
                },
                {
                  title: "Student Development",
                  description:
                    "Comprehensive programs to nurture young minds and prepare them for future challenges",
                  icon: "🎓",
                },
                {
                  title: "Industry Collaboration",
                  description:
                    "Strong partnerships with industry leaders to bridge the gap between academia and practice",
                  icon: "🤝",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 p-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  {/* Enhanced breathing effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 animate-pulse rounded-2xl"></div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                      <span className="text-2xl relative z-10">
                        {item.icon}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Events Section - Enhanced */}
        <section className="relative py-24 px-4 overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto max-w-6xl relative z-10"
          >
            <div className="text-center mb-16">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-600/20 opacity-0 animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse relative z-10"></div>
                <span className="text-sm font-medium relative z-10">
                  Featured Events
                </span>
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                  Upcoming
                </span>{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Events
                </span>
              </motion.h2>

              <motion.div
                variants={itemVariants}
                className="flex justify-center items-center gap-3 mt-8"
              >
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse animation-delay-500 shadow-lg shadow-indigo-500/50"></div>
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse animation-delay-1000 shadow-lg shadow-purple-500/50"></div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  id={index === 0 ? "opulence-2026" : undefined}
                  variants={itemVariants}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={() => {
  if (event.link) {
    window.location.href = event.link;
  }
}}
      className={`group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 ${
        event.link ? "cursor-pointer" : ""
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      <div
        className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-20 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-30 animate-pulse`}
        ></div>
      </div>

      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm flex items-center justify-center text-3xl border border-white/20 shadow-lg">
            {event.icon}
          </div>

          <span className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-xs font-medium border border-white/20">
            {event.date}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3">
          {event.title}
        </h3>

        <p className="text-gray-300 text-sm leading-relaxed mb-6">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {event.highlights.map((highlight, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-xs text-gray-300 border border-white/10"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${event.gradient}`}
              ></div>
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  ))}
</div>
  

            <motion.div variants={itemVariants} className="text-center">
              <Link
                href="/Events"
                className="group/btn inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaCalendar />
                  View All Events
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-600/20 opacity-0 animate-pulse"></div>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Contact Section - Enhanced */}
        <section className="relative py-24 px-4 overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="container mx-auto max-w-4xl relative z-10 text-center"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-600/20 opacity-0 animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse relative z-10"></div>
              <span className="text-sm font-medium relative z-10">
                Get in Touch
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white via-pink-100 to-rose-200 bg-clip-text text-transparent">
                Contact
              </span>{" "}
              <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
                Us
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed mb-12"
            >
              Ready to join our community of innovators? Get in touch with us
              today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex justify-center items-center gap-3 mb-12"
            >
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse shadow-lg shadow-pink-500/50"></div>
              <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse animation-delay-500 shadow-lg shadow-rose-500/50"></div>
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse animation-delay-1000 shadow-lg shadow-red-500/50"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.a
                variants={itemVariants}
                href="mailto:aacgriet.org@gmail.com"
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                {/* Enhanced breathing effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 animate-pulse rounded-2xl"></div>

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                    <FaEnvelope className="text-white text-xl relative z-10" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">
                    Email Us
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    aacgriet.org@gmail.com
                  </p>
                </div>
              </motion.a>

              <a
                href="https://instagram.com/aac_grietofficial?igshid=YmMyMTA2M2Y="
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

                  {/* Enhanced breathing effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 animate-pulse rounded-2xl"></div>

                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                      <FaUsers className="text-white text-xl relative z-10" />
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white">
                      Join Us
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Become part of our community
                    </p>
                  </div>
                </motion.div>
              </a>
            </div>
          </motion.div>
        </section>
      </Layout>
      </BannerContext.Provider>
    </div>
  );
};

export default Home;
