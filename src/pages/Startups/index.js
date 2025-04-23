// src/pages/Startups/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';

// Using the correct startup data
const startupsData = [
  {
    id: "siya",
    name: "SIYA EVENT PLANNERS",
    logo: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_800,w_800/v1664100122/AAC-web/startups/siyalogo_drp799.jpg",
    description: "Siya event planners make your birthdays, anniversaries and all other special occasions much more unique and memorable. Our services are now available at Warangal, Hyderabad, and Karimnagar. We are passionate and take each one of the events personally and find creative ways to deliver our best to the clients",
    mission: "There is this stigma in the society that event planning belongs only to the rich communities but we, Siya event planners are here to break that stigma and we provide quite affordable services. Our services include decor, catering, photography, live music, cake delivery, midnight surprises, etc and all our packages can be customized. We make the whole flow of planning an event easier and burden less to our customer!",
    image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,w_1800/v1666169002/AAC-web/startups/iPhone_8_-_21_sg4j6q.png",
    category: "Event Planning",
    color: "purple"
  },
  {
    id: "skillbattle",
    name: "SKILL BATTLE",
    logo: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_800,w_800/v1664100122/AAC-web/startups/skillbattle_apwld9.jpg",
    description: "Skill Battle is a platform that connects art enthusiasts and professionals across the globe. The main aim of Skill Battle is the transformation of a person's hobby into a career. They have a large number of specialized art educators in distinct art forms, where they can exchange their ideas and experience. In SkillBattle, one can participate in different competitions and connect with artists from various communities. It is known for the attractive opportunities that it offers at affordable prices.",
    mission: "My inspiration for Skillbattle is to create a skill based tomorrow, by equipping people to learn and work with freedom. We wanted to provide art education, art career mentorship and finally equip people to learn and work on what they love to do. Our motto involves creating skill based jobs for our coming generation.",
    image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,w_1800/v1666169019/AAC-web/startups/iPhone_8_-_31_eus2w6.png",
    category: "Education & Art",
    color: "orange"
  },
  {
    id: "rivach",
    name: "RIVACH",
    logo: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_800,w_800/v1664100122/AAC-web/startups/rivachlogo_x4isor.jpg",
    description: "Rivach is a B2B product services startup helping founders and entrepreneurs to make their product ideas into digital realities. Rivach has been started by student freelancers to increase the scope of being freelance developers of building a profitable product agency as a team. Solving real time problems as a team has much more impact on the product than solving as solo freelancers. Rivach now is a 8 member team of highly skilled developers and designers experimenting & building all phases of tech products.",
    mission: "I have always wanted to try different things and having my startup was one among them and because I had a keen interest in programming and have always wanted to put everything I have learned into some real-world application rather than just some theoretical problems. That's when we have decided to start Rivach which provides technical solutions to other startups to scale their business. We aim to provide digital support to as many startups and businesses as possible.-Vamshi Solving real-time tech market problems by working on product strategy, design and development are like playing multiplayer games for me. Doing that as a team has driven me to start Rivach from being a Freelancer working individually.-Rishwanth",
    image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,w_2800/v1666168980/AAC-web/startups/iPhone_8_-_11_vwkmac.png",
    category: "Technology",
    color: "blue"
  },
  {
    id: "matka",
    name: "MR. MATKA",
    logo: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_800,w_800/v1664100121/AAC-web/startups/matkalogo_x4aejm.jpg",
    description: "Mr. Matka is a curated food brand, that aims towards the reduction of environmental pollution and preparing delicious food at the same time. The brand believes in providing the food that is of unique taste. The food at Mr. Matka is prepared with utmost care using natural earthen cutlery. It essentially aims towards a healthy environment practice with a touch of tradition which enhances the taste and quality of the food.",
    mission: "The mother earth is divine & it's our responsibility to conserve it. Keeping the same in mind, I started to create something innovative and also promote clean & green environment. It's the taste in every bit, you get to feel our tradition and the love we serve. Contributing to a fortunate future generation in our own way is our uniqueness which intensified my passion to build this.",
    image: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,w_1800/v1666169059/AAC-web/startups/iPhone_8_-_41_jr2wcl.png",
    category: "Food & Sustainability",
    color: "green"
  }
];

// Extract all unique categories for filtering
const getAllCategories = () => {
  const allCategories = new Set(["All"]);
  
  startupsData.forEach(startup => {
    allCategories.add(startup.category);
  });
  
  return Array.from(allCategories);
};

const StartupCard = ({ startup, onClick }) => {
  // Get the appropriate gradient colors based on startup color
  const getGradientClass = (color) => {
    const colorMap = {
      "blue": "from-blue-900 to-indigo-900",
      "purple": "from-purple-900 to-indigo-900",
      "orange": "from-orange-900 to-amber-900",
      "green": "from-green-900 to-emerald-900"
    };
    return colorMap[color] || "from-blue-900 to-indigo-900";
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden h-full flex flex-col border border-gray-700"
    >
      {/* Logo Section with Gradient Background */}
      <div className={`relative h-48 w-full overflow-hidden bg-gradient-to-br ${getGradientClass(startup.color)}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-white/20">
            <Image 
              src={startup.logo} 
              alt={startup.name} 
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
        <div className="absolute bottom-3 left-4 right-4 z-10">
          <span 
            className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[#0e1421]/50 text-white border border-gray-700"
          >
            {startup.category}
          </span>
        </div>
      </div>
      
      {/* Startup Information */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-white">{startup.name}</h3>
        <p className="text-gray-300 mb-4 flex-grow line-clamp-3">{startup.description}</p>
        
        <div className="flex justify-end items-center mt-4">
          <button 
            onClick={() => onClick(startup)}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Learn More →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const StartupModal = ({ startup, onClose }) => {
  // Get the appropriate gradient colors based on startup color
  const getGradientClass = (color) => {
    const colorMap = {
      "blue": "from-blue-900 to-indigo-900",
      "purple": "from-purple-900 to-indigo-900",
      "orange": "from-orange-900 to-amber-900",
      "green": "from-green-900 to-emerald-900"
    };
    return colorMap[color] || "from-blue-900 to-indigo-900";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1a2535] rounded-xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with logo */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-4 bg-gradient-to-r ${getGradientClass(startup.color)} border-b border-gray-700`}>
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 mr-4">
              <Image 
                src={startup.logo} 
                alt={`${startup.name} logo`}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{startup.name}</h2>
              <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[#0e1421]/50 text-white border border-white/10">
                {startup.category}
              </span>
            </div>
          </div>
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="bg-[#0e1421]/70 hover:bg-[#0e1421] text-white p-2 rounded-full transition-colors border border-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Startup Image */}
        <div className={`w-full bg-[#0e1421] p-4`}>
          <div className="relative w-full h-48 md:h-60 overflow-hidden rounded-lg">
            <Image 
              src={startup.image} 
              alt={startup.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Content sections */}
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-white border-b border-gray-700 pb-2">About</h3>
            <p className="text-gray-300 leading-relaxed">{startup.description}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-3 text-white border-b border-gray-700 pb-2">Mission</h3>
            <div className="bg-[#0e1421] p-6 rounded-lg border border-gray-700">
              <p className="text-gray-300 leading-relaxed">{startup.mission}</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={onClose}
              className={`px-6 py-2 bg-gradient-to-r ${getGradientClass(startup.color)} text-white rounded-lg transition-colors border border-gray-700/50`}
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Startups = () => {
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Get all unique categories from startups
  const allCategories = getAllCategories();
  
  // Filter startups based on selected category
  const filteredStartups = filterCategory === 'All' 
    ? startupsData 
    : startupsData.filter(startup => startup.category === filterCategory);
  
  return (
    <Layout>
      <Head>
        <title>Startups | AAC - Advanced Academic Center</title>
        <meta name="description" content="Startups incubated at Advanced Academic Center, GRIET" />
      </Head>
      
      <PageHero 
        title="Startup Ecosystem" 
        subtitle="Discover innovative startups and student ventures emerging from our incubation program"
        tag="Innovation"
      />
      
      <div className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {/* Category filters */}
          <div className="flex flex-wrap justify-center mb-12 gap-3">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
                  filterCategory === category
                    ? 'bg-blue-900 text-blue-300 border border-blue-700'
                    : 'bg-[#1a2535] text-gray-300 hover:bg-blue-900/30 border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Startup grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredStartups.map((startup) => (
              <StartupCard 
                key={startup.id} 
                startup={startup} 
                onClick={setSelectedStartup}
              />
            ))}
          </div>
          
          {/* Incubation CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl shadow-xl p-8 border border-blue-700/50"
          >
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Have a Startup Idea?</h2>
                <p className="text-blue-100 max-w-2xl">
                  Join our incubation program and get access to mentorship, funding, and resources to grow your startup. We support student entrepreneurs turn their innovative ideas into successful businesses.
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="px-6 py-3 bg-[#0e1421] text-white rounded-full font-medium hover:bg-[#172E7C]/80 transition-colors border border-blue-700/30">
                  Apply Now
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Startup detail modal */}
      <AnimatePresence>
        {selectedStartup && (
          <StartupModal 
            startup={selectedStartup} 
            onClose={() => setSelectedStartup(null)} 
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Startups;