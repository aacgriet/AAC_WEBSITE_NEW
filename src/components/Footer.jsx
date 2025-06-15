// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin, 
  FaGithub,
  FaArrowUp
} from 'react-icons/fa';

const Logo = () => {
  return (
    <div className="flex items-center justify-center mb-6">
      <Image 
        src="/images/logo.png"
        height={120} 
        width={120} 
        alt="AAC Logo" 
        className="drop-shadow-lg"
      />
    </div>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <motion.a
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white bg-opacity-10 backdrop-blur-sm hover:bg-opacity-20 text-white rounded-full w-12 h-12 inline-flex items-center justify-center transition-all duration-300 border border-white border-opacity-20"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </motion.a>
  );
};

const FooterLink = ({ href, children }) => {
  return (
    <Link href={href} className="py-2 text-white opacity-80 hover:opacity-100 transition-opacity">
      {children}
    </Link>
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <footer className="relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1540] to-[#172E7C] z-0"></div>
      
      {/* Back to top button - FIXED POSITIONING */}
      <div className="absolute -top-6 left-0 right-0 flex justify-center z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white rounded-full p-3 shadow-lg cursor-pointer"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <FaArrowUp className="text-[#172E7C]" />
        </motion.button>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 text-white"
      >
        <div className="container mx-auto py-16 px-4">
          <motion.div variants={itemVariants}>
            <Logo />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold mb-6 border-b border-white border-opacity-20 pb-2">About Us</h3>
              <p className="text-sm text-gray-200 leading-relaxed">
                The Advanced Academic Center (AAC) of GRIET, Hyderabad is an inter-disciplinary 
                research centre committed to excellence in teaching, learning, and research, 
                bringing together experts with diverse backgrounds to address various aspects 
                of innovative problem areas.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold mb-6 border-b border-white border-opacity-20 pb-2">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <FooterLink href="/Research">Research</FooterLink>
                <FooterLink href="/Events">Events</FooterLink>
                <FooterLink href="/News">News</FooterLink>
                <FooterLink href="/Administration">Administration</FooterLink>
                <FooterLink href="/projects">Projects</FooterLink>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl font-bold mb-6 border-b border-white border-opacity-20 pb-2">Connect</h3>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <SocialButton label="LinkedIn" href="https://www.linkedin.com/school/aac-griet/">
                    <FaLinkedin />
                  </SocialButton>
                  <SocialButton label="YouTube" href="https://www.youtube.com/channel/UCqpWtDtDLxBLy8yJZO_-eBw">
                    <FaYoutube />
                  </SocialButton>
                  <SocialButton label="Instagram" href="https://instagram.com/aac_grietofficial?igshid=YmMyMTA2M2Y=">
                    <FaInstagram />
                  </SocialButton>
                  <SocialButton label="GitHub" href="https://github.com/aacgriet">
                    <FaGithub />
                  </SocialButton>
                </div>
                <a href="mailto:aacgriet.org@gmail.com" className="text-white hover:underline">
                  aacgriet.org@gmail.com
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            className="mt-12 pt-6 border-t border-white border-opacity-10 text-center"
          >
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} Advanced Academic Center. All rights reserved.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;