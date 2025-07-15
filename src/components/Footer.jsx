// src/components/Footer.jsx - Fixed arrow z-index positioning
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaGithub,
  FaArrowUp,
  FaEnvelope,
  FaExternalLinkAlt
} from 'react-icons/fa';

const Logo = () => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center justify-center mb-8"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl"></div>
        <Image 
          src="/images/logo.png"
          height={120} 
          width={120} 
          alt="AAC Logo" 
          className="relative z-10 drop-shadow-2xl"
        />
      </div>
    </motion.div>
  );
};

const SocialButton = ({ children, label, href, color = "from-blue-500 to-blue-600" }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white rounded-full w-12 h-12 inline-flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white/30 overflow-hidden`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
        {children}
      </span>
    </motion.a>
  );
};

const FooterLink = ({ href, children, external = false }) => {
  const LinkComponent = external ? 'a' : Link;
  const linkProps = external 
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <LinkComponent 
      {...linkProps}
      className="group flex items-center gap-2 py-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1"
    >
      <span className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
      {children}
      {external && <FaExternalLinkAlt className="text-xs opacity-50 group-hover:opacity-100 transition-opacity duration-300" />}
    </LinkComponent>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative">
      {/* Back to top button - Fixed with proper z-index */}
      <div className="flex justify-center relative z-10 -mt-8">
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="group relative backdrop-blur-sm bg-white/10 hover:bg-white/20 rounded-full p-4 shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden"
          onClick={scrollToTop}
          aria-label="Back to top"
          style={{ zIndex: 5 }} // Lower z-index to not conflict with cards
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <FaArrowUp className="relative z-10 text-white group-hover:scale-110 transition-transform duration-300" />
        </motion.button>
      </div>

      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden -mt-8" style={{ zIndex: 1 }}>
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12 animate-pulse"></div>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 text-white"
        >
          <div className="container mx-auto py-20 px-4">
            <motion.div variants={itemVariants}>
              <Logo />
            </motion.div>
            
            {/* Main content area */}
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* About Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div>
                    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-4 rounded-full shadow-lg"></div>
                    <h3 className="text-2xl font-bold text-white">About AAC</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    The Advanced Academic Center (AAC) of GRIET, Hyderabad is an inter-disciplinary 
                    research centre committed to excellence in teaching, learning, and research, 
                    bringing together experts with diverse backgrounds to address various aspects 
                    of innovative problem areas.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
                    <div className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
                  </div>
                </motion.div>
                
                {/* Quick Links Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div>
                    <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-1.5 w-24 mb-4 rounded-full shadow-lg"></div>
                    <h3 className="text-2xl font-bold text-white">Quick Links</h3>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <FooterLink href="/Achievements">Achievements</FooterLink>
                    <FooterLink href="/Research">Research</FooterLink>
                    <FooterLink href="/Events">Events</FooterLink>
                    <FooterLink href="/News">News</FooterLink>
                    <FooterLink href="/Administration">Administration</FooterLink>
                    <FooterLink href="/projects">Projects</FooterLink>
                  </div>
                </motion.div>
                
                {/* Connect Section */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div>
                    <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 h-1.5 w-24 mb-4 rounded-full shadow-lg"></div>
                    <h3 className="text-2xl font-bold text-white">Connect With Us</h3>
                  </div>
                  
                  {/* Social Media Icons */}
                  <div className="flex flex-wrap gap-4">
                    <SocialButton 
                      label="LinkedIn" 
                      href="https://www.linkedin.com/school/aac-griet/"
                      color="from-blue-600 to-blue-700"
                    >
                      <FaLinkedin />
                    </SocialButton>
                    <SocialButton 
                      label="YouTube" 
                      href="https://www.youtube.com/channel/UCqpWtDtDLxBLy8yJZO_-eBw"
                      color="from-red-600 to-red-700"
                    >
                      <FaYoutube />
                    </SocialButton>
                    <SocialButton 
                      label="Instagram" 
                      href="https://instagram.com/aac_grietofficial?igshid=YmMyMTA2M2Y="
                      color="from-pink-600 to-purple-700"
                    >
                      <FaInstagram />
                    </SocialButton>
                    <SocialButton 
                      label="GitHub" 
                      href="https://github.com/aacgriet"
                      color="from-gray-600 to-gray-700"
                    >
                      <FaGithub />
                    </SocialButton>
                  </div>
                  
                  {/* Contact Email */}
                  <motion.a 
                    href="mailto:aacgriet.org@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    className="group inline-flex items-center gap-3 px-4 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <FaEnvelope className="text-sm text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        Get In Touch
                      </div>
                      <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                        aacgriet.org@gmail.com
                      </div>
                    </div>
                  </motion.a>
                </motion.div>
              </div>
            </div>
            
            {/* Copyright Section */}
            <motion.div 
              variants={itemVariants}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-300"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-600"></div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
              
              <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
                © {new Date().getFullYear()} Advanced Academic Center, GRIET. All rights reserved.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Footer;