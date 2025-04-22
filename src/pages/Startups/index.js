// src/pages/Startups/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';

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

const StartupCard = ({ startup, onClick }) => {
  const gradientColors = {
    "blue": "from-blue-600 to-indigo-700",
    "purple": "from-purple-600 to-pink-600",
    "orange": "from-orange-500 to-pink-500",
    "green": "from-green-600 to-teal-600",
  };
  
  const gradientClass = gradientColors[startup.color] || "from-blue-600 to-indigo-700";
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl shadow-xl overflow-hidden h-full cursor-pointer"
      onClick={() => onClick(startup.id)}
    >
      <div className="bg-white p-8 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 mb-4">
          <Image
            src={startup.logo}
            alt={startup.name}
            fill
            className="rounded-full object-cover border-4 border-gray-100 shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-bold text-center mb-2">{startup.name}</h3>
        <span className={`inline-block px-3 py-1 text-xs font-medium text-white bg-gradient-to-r ${gradientClass} rounded-full`}>
          {startup.category}
        </span>
      </div>
      <div className={`bg-gradient-to-r ${gradientClass} p-4 text-center`}>
        <span className="text-white font-medium">Learn More</span>
      </div>
    </motion.div>
  );
};

const StartupDetail = ({ startup, onClose }) => {
  const gradientColors = {
    "blue": "from-blue-600 to-indigo-700",
    "purple": "from-purple-600 to-pink-600",
    "orange": "from-orange-500 to-pink-500",
    "green": "from-green-600 to-teal-600",
  };
  
  const gradientClass = gradientColors[startup.color] || "from-blue-600 to-indigo-700";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-r ${gradientClass} p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 md:mb-0 mr-0 md:mr-6">
              <Image
                src={startup.logo}
                alt={startup.name}
                fill
                className="rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>
            <div className="text-white text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{startup.name}</h2>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white/20 backdrop-blur-sm rounded-full">
                {startup.category}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-800">What {startup.name.split(' ')[0]} does?</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {startup.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">Reason Behind</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {startup.mission}
                </p>
              </div>
            </div>
            
            <div className="relative w-full h-full min-h-[300px] rounded-lg overflow-hidden">
              <Image
                src={startup.image}
                alt={`${startup.name} screenshot`}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="py-2 px-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full hover:from-black hover:to-gray-800 transition-colors"
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
  
  const handleStartupClick = (id) => {
    const startup = startupsData.find(s => s.id === id);
    setSelectedStartup(startup);
  };
  
  const handleCloseModal = () => {
    setSelectedStartup(null);
  };
  
  return (
    <Layout>
      <Head>
        <title>Startups | AAC - Advanced Academic Center</title>
        <meta name="description" content="Student startups from Advanced Academic Center at GRIET" />
      </Head>
      
      <div className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
              Entrepreneurship
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Startups
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the innovative startups founded by our students, transforming ideas into impactful ventures.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {startupsData.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <StartupCard
                  startup={startup}
                  onClick={handleStartupClick}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Startup Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Startup Journey</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                We support student entrepreneurs through every phase of their startup journey, from ideation to market launch.
              </p>
            </div>
            
            <div className="relative py-12">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 to-indigo-700"></div>
              
              {/* Timeline items */}
              {[
                { 
                  step: "Ideation", 
                  description: "Students brainstorm innovative solutions to real-world problems through design thinking workshops.",
                  icon: "💡"
                },
                { 
                  step: "Validation", 
                  description: "Ideas are validated through market research, mentorship from industry experts, and prototype testing.",
                  icon: "✅"
                },
                { 
                  step: "Incubation", 
                  description: "Promising ventures receive resources, workspace, and seed funding to develop their minimum viable product.",
                  icon: "🌱"
                },
                { 
                  step: "Launch", 
                  description: "Startups launch their products/services in the market with continued support from our network.",
                  icon: "🚀"
                }
              ].map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  className={`relative flex items-center justify-between mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <h3 className="text-xl font-bold mb-2">{phase.step}</h3>
                    <p className="text-gray-600">{phase.description}</p>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
                      {phase.icon}
                    </div>
                  </div>
                  
                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl px-6 py-12 shadow-xl">
              <h2 className="text-3xl font-bold mb-4">Have a Startup Idea?</h2>
              <p className="max-w-2xl mx-auto mb-8">
                We provide mentorship, resources, and a supportive community to help turn your idea into a successful venture.
              </p>
              <button className="px-8 py-3 bg-white text-blue-900 rounded-full font-medium hover:bg-blue-50 transition-colors">
                Submit Your Idea
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Startup Detail Modal */}
      <AnimatePresence>
        {selectedStartup && (
          <StartupDetail
            startup={selectedStartup}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Startups;