// src/pages/About/index.js - Complete About AAC Page - FIXED GAP ONLY
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { FaCode, FaMobile, FaBrain, FaWifi, FaEye, FaRobot, FaUsers, FaGraduationCap, FaLightbulb, FaHandshake } from 'react-icons/fa';

const AboutAAC = () => {
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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 0.6 }
    }
  };

  // Domain data
  const domains = [
    {
      icon: <FaCode className="text-2xl" />,
      title: "Web Development",
      shortName: "WEB",
      description: "Full-stack development using modern frameworks like React, Next.js, Node.js, and cloud technologies.",
      color: "from-blue-500 to-blue-600",
      projects: ["E-commerce platforms", "Portfolio websites", "Web applications"]
    },
    {
      icon: <FaMobile className="text-2xl" />,
      title: "App Development",
      shortName: "APP",
      description: "Mobile application development for Android and iOS using React Native, Flutter, and native technologies.",
      color: "from-green-500 to-green-600",
      projects: ["Mobile apps", "Cross-platform solutions", "UI/UX design"]
    },
    {
      icon: <FaBrain className="text-2xl" />,
      title: "Machine Learning",
      shortName: "ML",
      description: "Artificial Intelligence and Machine Learning solutions using Python, TensorFlow, and advanced algorithms.",
      color: "from-purple-500 to-purple-600",
      projects: ["Predictive models", "Data analysis", "AI automation"]
    },
    {
      icon: <FaWifi className="text-2xl" />,
      title: "Internet of Things",
      shortName: "IOT",
      description: "Smart device connectivity and automation using Arduino, Raspberry Pi, and sensor integration.",
      color: "from-orange-500 to-orange-600",
      projects: ["Smart home systems", "Industrial automation", "Sensor networks"]
    },
    {
      icon: <FaEye className="text-2xl" />,
      title: "Computer Vision",
      shortName: "CV",
      description: "Image processing and computer vision applications using OpenCV, deep learning, and neural networks.",
      color: "from-indigo-500 to-indigo-600",
      projects: ["Object detection", "Image recognition", "Video analysis"]
    },
    {
      icon: <FaRobot className="text-2xl" />,
      title: "Robotics",
      shortName: "ROBOTICS",
      description: "Robotic systems development including automation, control systems, and intelligent machines.",
      color: "from-red-500 to-red-600",
      projects: ["Autonomous robots", "Control systems", "Mechanical design"]
    }
  ];

  // Selection process steps
  const selectionSteps = [
    {
      step: "01",
      title: "Application",
      description: "Students submit their applications with academic records and statement of interest.",
      icon: <FaGraduationCap />
    },
    {
      step: "02",
      title: "Technical Assessment",
      description: "Candidates undergo technical evaluation based on their chosen domain and problem-solving skills.",
      icon: <FaBrain />
    },
    {
      step: "03",
      title: "Interview Round",
      description: "Personal interview to assess passion, commitment, and alignment with AAC's vision.",
      icon: <FaUsers />
    },
    {
      step: "04",
      title: "Final Selection",
      description: "Selected candidates join AAC and begin their journey in advanced academic research.",
      icon: <FaLightbulb />
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <PageHero
        title="About AAC"
        subtitle="Discover the Advanced Academic Center - where innovation meets excellence in technological education and research."
        tag="Learn About Us"
        highlightTitle={true}
      />

      {/* Main Content - REMOVED GAP BY REMOVING py-20 and using -mt-12 to connect directly */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 -mt-12">
        {/* Enhanced background effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -left-[20%] w-[60%] h-[100%] bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[10%] -right-[20%] w-[60%] h-[80%] bg-gradient-to-br from-indigo-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-[40%] -left-[25%] w-[70%] h-[70%] bg-gradient-to-br from-emerald-400/10 to-teal-600/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20 pb-20">
          {/* What is AAC Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div>
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">What is AAC?</span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                    Advanced Academic
                  </span>{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Center
                  </span>
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  className="space-y-6 text-gray-300 leading-relaxed"
                >
                  <p className="text-lg">
                    The Advanced Academic Center (AAC) is GRIET's premier <span className="text-blue-400 font-semibold">technology club and research hub</span>, 
                    where passionate students dive deep into cutting-edge technologies and innovative project development.
                  </p>
                  
                  <p>
                    Founded with the vision of bridging the gap between academic learning and industry requirements, AAC serves as a 
                    catalyst for <span className="text-purple-400 font-semibold">technological innovation</span> and 
                    <span className="text-green-400 font-semibold"> research excellence</span>.
                  </p>
                  
                  <p>
                    We foster a collaborative environment where students work on real-world projects, conduct research, 
                    participate in hackathons, and develop solutions that make a meaningful impact on society.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4 mt-8"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
                    <FaLightbulb />
                    <span className="text-sm font-medium">Innovation Hub</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-300 rounded-full border border-green-500/30">
                    <FaHandshake />
                    <span className="text-sm font-medium">Research Center</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                    <FaUsers />
                    <span className="text-sm font-medium">Tech Community</span>
                  </div>
                </motion.div>
              </div>

              {/* Visual Element */}
              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                      <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
                      <div className="text-gray-300 text-sm">Projects Completed</div>
                    </div>
                    <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                      <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
                      <div className="text-gray-300 text-sm">Active Members</div>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                      <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                      <div className="text-gray-300 text-sm">Awards Won</div>
                    </div>
                    <div className="bg-orange-500/10 rounded-xl p-4 border border-orange-500/20">
                      <div className="text-3xl font-bold text-orange-400 mb-2">20+</div>
                      <div className="text-gray-300 text-sm">Years Legacy</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Domains Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Our Expertise</span>
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent">
                  Technology
                </span>{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
                  Domains
                </span>
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-purple-100/90 max-w-4xl mx-auto leading-relaxed"
              >
                Explore the diverse technological domains where our members excel and innovate
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {domains.map((domain, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${domain.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  <div className="p-6 relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${domain.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      {domain.icon}
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                        {domain.title}
                      </h3>
                      <span className={`px-2 py-1 bg-gradient-to-r ${domain.color}/20 text-xs font-medium rounded border border-white/20`}>
                        {domain.shortName}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                      {domain.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Key Focus Areas:</h4>
                      {domain.projects.map((project, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${domain.color}`}></div>
                          <span className="text-sm text-gray-400">{project}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Selection Process Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="text-center mb-16">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Join Us</span>
              </motion.div>
              
              <motion.h2
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent">
                  Selection
                </span>{' '}
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Process
                </span>
              </motion.h2>
              
              <motion.p
                variants={itemVariants}
                className="text-xl text-green-100/90 max-w-4xl mx-auto leading-relaxed"
              >
                Our rigorous selection process ensures we identify the most passionate and talented students
              </motion.p>
            </div>

            <div className="max-w-4xl mx-auto">
              {selectionSteps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative mb-12 last:mb-0"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.step}
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-blue-400 text-xl">
                          {step.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {index < selectionSteps.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-12 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* How Classes Work Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Visual Element */}
              <motion.div
                variants={itemVariants}
                className="order-2 lg:order-1"
              >
                <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                        🏢
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Dedicated Classrooms</h4>
                        <p className="text-gray-400 text-sm">Modern labs equipped with latest technology</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                        📝
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Interactive Learning</h4>
                        <p className="text-gray-400 text-sm">Hands-on sessions with whiteboards and projectors</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
                        👨‍💻
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Practical Sessions</h4>
                        <p className="text-gray-400 text-sm">Live coding and project development</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Learning Environment</span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-white via-orange-100 to-yellow-200 bg-clip-text text-transparent">
                    How Classes
                  </span>{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                    Work
                  </span>
                </motion.h2>

                <motion.div
                  variants={itemVariants}
                  className="space-y-6 text-gray-300 leading-relaxed"
                >
                  <p className="text-lg">
                    Our classes are conducted in <span className="text-blue-400 font-semibold">dedicated AAC rooms</span> equipped 
                    with state-of-the-art technology, creating an immersive learning environment.
                  </p>
                  
                  <p>
                    Each session combines <span className="text-purple-400 font-semibold">theoretical concepts</span> with 
                    <span className="text-green-400 font-semibold"> hands-on practice</span>. Students work directly on computers, 
                    following along with instructors who demonstrate concepts on smart boards and projectors.
                  </p>
                  
                  <p>
                    Our unique approach includes <span className="text-orange-400 font-semibold">peer learning</span>, where senior 
                    students mentor juniors, creating a collaborative atmosphere that accelerates learning and builds strong 
                    technical communities.
                  </p>
                  
                  <p>
                    Classes are structured around <span className="text-red-400 font-semibold">project-based learning</span>, 
                    ensuring students don't just learn concepts but apply them to build real-world solutions.
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mt-8"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 text-orange-300 rounded-full border border-orange-500/30 w-fit">
                    <FaUsers />
                    <span className="text-sm font-medium">20-25 students per batch</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="backdrop-blur-sm bg-white/5 rounded-2xl p-12 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 h-1.5 w-24 mx-auto mb-8 rounded-full shadow-lg"></div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white via-pink-100 to-rose-200 bg-clip-text text-transparent">
                  Ready to Join
                </span>{' '}
                <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 bg-clip-text text-transparent">
                  AAC?
                </span>
              </h2>
              
              <p className="text-xl text-pink-100/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Take the first step towards advancing your technical skills and joining a community of innovators
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group/btn px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Apply Now
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              {/* Decorative dots */}
              <div className="flex justify-center items-center gap-3 mt-8">
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse animation-delay-500"></div>
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse animation-delay-1000"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutAAC;