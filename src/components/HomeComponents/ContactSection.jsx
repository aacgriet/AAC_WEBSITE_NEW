// src/components/HomeComponents/ContactSection.jsx - Updated with Modern Premium UI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaExternalLinkAlt, FaPaperPlane } from 'react-icons/fa';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create mailto link with form data
      const subject = `Contact Form Submission from ${formState.name}`;
      const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;
      const mailtoLink = `mailto:aacgriet.org@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open mailto link
      window.location.href = mailtoLink;
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      setFormState({
        name: '',
        email: '',
        message: '',
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('There was an error sending your message. Please try again or contact us directly at aacgriet.org@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Animation variants
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
  
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      info: 'aacgriet.org@gmail.com',
      link: 'mailto:aacgriet.org@gmail.com',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      info: 'GRIET, Hyderabad, India',
      link: 'https://maps.google.com/?q=Gokaraju+Rangaraju+Institute+of+Engineering+and+Technology,+Hyderabad',
      color: 'from-blue-500 to-blue-600'
    },
  ];
  
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
        >
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Get in Touch</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-white via-pink-100 to-rose-200 bg-clip-text text-transparent">
            Contact
          </span>{' '}
          <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
            Us
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed"
        >
          Have questions or want to collaborate? We'd love to hear from you!
        </motion.p>

        {/* Decorative dots */}
        <div className="flex justify-center items-center gap-3 mt-8">
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse animation-delay-500"></div>
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse animation-delay-1000"></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          {/* Gradient section line */}
          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
          
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-bold mb-6 text-white"
          >
            Send a Message
          </motion.h3>
          
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="backdrop-blur-sm bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaPaperPlane className="text-white text-xl" />
              </div>
              <p className="text-emerald-100 text-lg font-medium mb-2">
                Thank you! Your email client should open shortly.
              </p>
              <p className="text-emerald-200 text-sm">
                If it doesn't open automatically, please email us directly at aacgriet.org@gmail.com
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Your Name"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                  placeholder="Your Email"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                  placeholder="Your Message"
                ></textarea>
              </motion.div>
              
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="group/btn w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <FaPaperPlane className="group-hover/btn:translate-x-1 transition-transform duration-200" />
                  {isSubmitting ? 'Opening Email Client...' : 'Send Message'}
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.p
                variants={itemVariants}
                className="text-gray-400 text-sm text-center"
              >
                This will open your email client to send the message to aacgriet.org@gmail.com
              </motion.p>
            </form>
          )}
        </motion.div>
        
        {/* Contact Info */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {contactInfo.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex items-start gap-4"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color.replace('to-', 'to-').replace('from-', 'from-')}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                {item.icon}
              </div>
              <div className="relative z-10">
                <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {item.title}
                </h4>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex items-center gap-2">
                  {item.info}
                  <FaExternalLinkAlt className="text-xs opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                </p>
              </div>
            </motion.a>
          ))}
          
          {/* Social Media Section */}
          <motion.div
            variants={itemVariants}
            className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            {/* Gradient section line */}
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
            
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Follow us on social media for the latest updates on events, research, and opportunities.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/school/aac-griet/', color: 'from-blue-600 to-blue-700' },
                { name: 'YouTube', url: 'https://www.youtube.com/channel/UCqpWtDtDLxBLy8yJZO_-eBw', color: 'from-red-600 to-red-700' },
                { name: 'Instagram', url: 'https://instagram.com/aac_grietofficial?igshid=YmMyMTA2M2Y=', color: 'from-pink-600 to-purple-700' },
                { name: 'GitHub', url: 'https://github.com/aacgriet', color: 'from-gray-600 to-gray-700' }
              ].map((platform, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 bg-gradient-to-r ${platform.color} text-white text-sm rounded-lg hover:shadow-lg transition-all duration-300 font-medium`}
                >
                  {platform.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;