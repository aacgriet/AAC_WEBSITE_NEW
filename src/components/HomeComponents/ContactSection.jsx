// src/components/HomeComponents/ContactSection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send the form data to your backend
    console.log('Form submitted:', formState);
    
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
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  
  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      info: 'aacgriet.org@gmail.com',
      link: 'mailto:aacgriet.org@gmail.com',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      info: 'GRIET, Hyderabad, India',
      link: 'https://maps.google.com/?q=Gokaraju+Rangaraju+Institute+of+Engineering+and+Technology,+Hyderabad',
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      info: '+91 XXXXXXXXXX',
      link: 'tel:+91XXXXXXXXXX',
    },
  ];
  
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-16">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-block px-3 py-1 text-sm font-medium bg-blue-200 text-blue-900 rounded-full mb-4"
        >
          Get in Touch
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-white"
        >
          Contact Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="text-xl text-blue-100 max-w-3xl mx-auto"
        >
          Have questions or want to collaborate? We'd love to hear from you!
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 shadow-xl overflow-hidden border border-white border-opacity-20"
        >
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
              className="bg-green-600 bg-opacity-20 backdrop-blur-sm border border-green-500 border-opacity-30 rounded-lg p-4 text-center"
            >
              <p className="text-green-100 text-lg font-medium">
                Thank you! Your message has been sent successfully.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <motion.div 
                variants={itemVariants}
                className="mb-6 relative"
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-blue-200 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your Name"
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="mb-6 relative"
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-blue-200 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your Email"
                />
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="mb-6 relative"
              >
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg px-4 py-3 text-white placeholder-blue-200 placeholder-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your Message"
                ></textarea>
              </motion.div>
              
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full py-3 px-6 bg-white text-blue-900 font-medium rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Send Message
              </motion.button>
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
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="flex items-start space-x-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-2xl text-white">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">{item.title}</h4>
                <p className="text-blue-100">{item.info}</p>
              </div>
            </motion.a>
          ))}
          
          <motion.div
            variants={itemVariants}
            className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20"
          >
            <h4 className="text-lg font-medium text-white mb-4">Connect With Us</h4>
            <p className="text-blue-100 mb-4">
              Follow us on social media for the latest updates on projects, events, and opportunities.
            </p>
            <div className="flex space-x-4">
              {['LinkedIn', 'YouTube', 'Instagram', 'GitHub'].map((platform, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="px-4 py-2 bg-white bg-opacity-20 rounded-lg text-white text-sm hover:bg-opacity-30 transition-all duration-300"
                >
                  {platform}
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