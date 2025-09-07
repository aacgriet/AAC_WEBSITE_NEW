
// src/pages/Administration/index.js - Updated with Core Committee Import and Year Filters
import {
  coreCommitteeData,
  getAvailableYears,
} from "@/components/Data/coreCommitteeData";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { FaLightbulb, FaUsers, FaUserTie } from "react-icons/fa";

const AdministrationPage = () => {
  // State to track the active category
  const [activeCategory, setActiveCategory] = useState("instigators");

  // State for Core Committee year filter
  const availableYears = getAvailableYears();
  const [selectedYear, setSelectedYear] = useState(availableYears[0]);

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  // Data for each category
  const instigatorData = [
    {
      id: "1",
      name: "Dr. S.N.N.Pandit",
      about:
        "Dr.S.N.N.Pandit was the founder head of the statistics department in Dibrugarh University, Assam. Dr.Pandit gave the idea of 'Advanced Academic Center' in 2004 as a forum to generate creative ideas involving faculty and students at the time of his visit to GRIET in 2003-04 when he had motivated faculty towards research. Dr.Pandit has also supervised 35 Ph.D scholars in variety of domains. He was the founder director of Center Of Quantitative Methods at Osmania University.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100148/AAC-web/mentors/pandith_s8bqhh.jpg",
    },
    {
      id: "2",
      name: "Dr. Satteluri R.K.Iyengar",
      about:
        "Dr.S.R.K.Iyengar was professor at IIT Delhi in the department of Mathematics for over 38 years.Dr.Iyengar worked as a post-doctoral fellow at the Oxford University Computing Laborator,U.K.He is the author of over half a dozen text books,which have won industrial acclaims. Dr.Iyengar served GRIET between 2004 to 2012 with distinction. he brought in good academic culture in the institute. he was the first Dean,Academic Affairs at GRIET. Dr.Iyengar is one of the pillars of Advanced Academic Center at GRIET along with DR.S.N.N.Pandit.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/iyengar_dmrolm.jpg",
    },
  ];

  const headAdvisorData = [
    {
      id: "1",
      name: "Dr. Jandhyala N Murthy",
      occupation: "DIRECTOR, GRIET",
      about:
        "Dr. Jandhyala N Murthy after voluntarily taking retirement from the IAF as a Wing Commander in 2001,immediately joined as a professor in the Department of Mechanical Engineering at GRIET.Later on taking up the position as the Director of GRIET since 31 January 2018, after a successful tenure as the Principal of GRIET since March 2004.His areas of interest span the Thermal Engineering domain, Gas Turbine Combustion Chambers, simulation and education.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1752569355/AAC-web/mentors/jandhyala.png",
    },
    {
      id: "2",
      name: "Dr. J Praveen",
      occupation: "PRINCIPAL, GRIET",
      about:
        "Dr. J Praveen has contributed to a major research areas in Power Electronics and has published more than 80 research papers in reputed International and National Journals and Conferences.He is Registered as a  PhD Guide at Department of Electrical and Electronics Engineering, J.N.T University.Along with his other achievements he also received  International Certification on 'High Impact Teaching Skills' by Dale Carnegie & Associates Inc. Trainers (USA), Mission 10x, Wipro Technologies. ",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/jpraveen_mzj4fp.jpg",
    },
    {
      id: "4",
      name: "Dr. Mamidi Kiran Kumar",
      occupation: "DEAN, AAC",
      about:
        "Dr. Mamidi Kiran Kumar, an Associate Professor in the Department of Artificial Intelligence and Machine Learning Engineering at Gokaraju Rangaraju Institute of Engineering and Technology (GRIET) in Hyderabad, is a Rajeev Gandhi National Fellowship awardee. Specializing in Area-based Localization Techniques for Wireless Sensor Networks. With over a decade of academic and research experience, he's proficient in teaching B.TECH and M.TECH students, and has evaluated Graduate Level Examinations.",
      image:
        "https://res.cloudinary.com/dltvvelmx/image/upload/v1694781872/kiran1610_hhgs1v.jpg",
    },
  ];

  const advisorData = [
    {
      id: "5",
      name: "Dr. Arvind Vishnubhatla",
      occupation: "PROFESSOR, ECE GRIET",
      about:
        "Dr. Arvind Vishnubhatla is currently working as Professor at GRIET.His areas of research and interests include Signal Processing, Embedded Systems, System Design. He worked on GSM switch Microlite Development of a Distributed digital control system for the automation of Steel plants.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100146/AAC-web/mentors/aravind_gnf36b.jpg",
    },
    {
      id: "6",
      name: "Dr. G.V.K. Madhav",
      occupation:
        "SYSTEMS ENGINEER EG RND, HEWLETT PACKARD ENTERPRISE, BANGALOR",
      about:
        "Dr. G.V.K.Madhav works for HPE(Hewlett-Packard Enterprise) in the HPC (High Performance Computing) RnD division. For his Master's thesis he worked using GPUs for improving the performance of LiFE(Linear Fascicle Evaluation) software got published as a poster at 'OHBM (Organization for Human Brain Mapping) 2018 Conference'.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100147/AAC-web/mentors/madhav1_fuuehs.jpg",
    },
    {
      id: "7",
      name: "Mr. Satish Yellanki",
      occupation:
        "CORPORATE TRAINER AT SATISH GROUP OF INSTITUTE OF SOFTWARE SOLUTIONS",
      about:
        "Mr. Satish is a corporate specialist with an experience of about 22 years in the industry. He has provided solutions to diversified domain in health care, insurance, educational and hospitality. He has trained a vast no. of students and industrial professionals in various IT and business domains. With Specialization in System analysis and solution based architecture development and consulting",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_400/v1664100153/AAC-web/mentors/sss_sv2h2p.jpg",
    },
    {
      id: "8",
      name: "Mr. Pradeep Palelli",
      occupation: "THE CO-FOUNDER AND CEO OF THANOS TECHNOLOGIES PVT LTD.",
      about:
        "Mr. Pradeep brings 10 years of professional experience that includes 6 years of running start-ups. Pradeep is responsible for business and operations at Thanos. In his previous stints at Efficient Carbon and Zolt Energy, he handled Operations, Service and Sales in various capacities.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100150/AAC-web/mentors/pradeepp_j0e7p3.jpg",
    },
    {
      id: "9",
      name: "Dr. Naresh Kumar Mallenahalli",
      occupation: "SCIENTIST AT NRSC",
      about:
        "Dr. Naresh works in the software group of satellite data processing area at National Remote Sensing Centre (ISRO), Hyderabad.Some of his current research interests include mathematical modeling and simulations, computational intelligence, statistical machine learning and so on.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100152/AAC-web/mentors/naresh_x933qn.png",
    },
    {
      id: "10",
      name: "Shri Kidambi Seshadri",
      occupation: "SCIENTIST AT NRSC ISRO/DOS",
      about:
        "Shri Kidambi Seshadri was the recipient for 'ISRO award' for 2007 under RGNDWM project.He was working as the project manager in preparation of state-of-art groundwater prospects maps on 1:50,000 scale using Remote Sensing (RS) and Geographical Information System (GIS) techniques under RGNDWM.He was also the head of Mineral Exploration Geo-environmental Studies (MEGS) & Scientist 'SG', Geosciences Group, Remote Sensing Application Area (RSA), NRSC ISRO/DOS, Hyderabad.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100151/AAC-web/mentors/seshadri_kdwupb.jpg",
    },
  ];

  // Tab configuration - Update committee count dynamically
  const tabs = [
    {
      key: "instigators",
      label: "Instigators",
      icon: FaLightbulb,
      count: instigatorData.length,
      color: "from-amber-500 to-amber-600",
    },
    {
      key: "headadvisors",
      label: "Head Advisors",
      icon: FaLightbulb,
      count: headAdvisorData.length,
      color: "from-amber-500 to-amber-600",
    },
    {
      key: "advisors",
      label: "Advisors",
      icon: FaUserTie,
      count: advisorData.length,
      color: "from-blue-500 to-blue-600",
    },
    {
      key: "committee",
      label: "Core Committee",
      icon: FaUsers,
      count: coreCommitteeData[selectedYear]?.length || 0,
      color: "from-purple-500 to-purple-600",
    },
  ];

  // Components for different display types
  const InstigatorCard = ({ data, index }) => (
    <motion.div
      variants={itemVariants}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      <div className="flex flex-col md:flex-row relative z-10">
        <div className="md:w-1/3 p-8 flex items-center justify-center backdrop-blur-sm bg-white/5">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3 p-8">
          {/* Gradient section line */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {data.name}
          </h3>
          <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
            {data.about}
          </p>
        </div>
      </div>
    </motion.div>
  );

  const HeadAdvisorCard = ({ data, index }) => (
    <motion.div
      variants={itemVariants}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      <div className="flex flex-col md:flex-row relative z-10">
        <div className="md:w-1/3 p-8 flex items-center justify-center backdrop-blur-sm bg-white/5">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3 p-8">
          {/* Gradient section line */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {data.name}
          </h3>
          <div className="mb-4">
            <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30">
              {data.occupation}
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
            {data.about}
          </p>
        </div>
      </div>
    </motion.div>
  );

  const AdvisorCard = ({ data, index }) => (
    <motion.div
      variants={itemVariants}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

      <div className="flex flex-col md:flex-row relative z-10">
        <div className="md:w-1/3 p-8 flex items-center justify-center backdrop-blur-sm bg-white/5">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-white/20 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-2/3 p-8">
          {/* Gradient section line */}
          <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>

          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {data.name}
          </h3>
          <div className="mb-4">
            <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30">
              {data.occupation}
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed text-lg group-hover:text-gray-300 transition-colors duration-300">
            {data.about}
          </p>
        </div>
      </div>
    </motion.div>
  );

  const CommitteeMemberCard = ({ data, index }) => {
  const handleImageClick = () => {
    if (data.linkedin) {
      window.open(data.linkedin, '_blank', 'noopener,noreferrer');
    }
  };
  
  const imageUrl = data.image.startsWith('http') 
    ? data.image 
    : `https://drive.google.com/uc?export=view&id=${data.image}`;
  
  return (
    <motion.div
      variants={itemVariants}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.05 }}
      onClick={handleImageClick}
      className="group relative"
      style={{ cursor: data.linkedin ? 'pointer' : 'default' }}
    >
      <div className="relative">
        {/* Smaller card with max width of 160px */}
        <div className="aspect-[3/4] relative overflow-hidden rounded-xl max-w-[160px] mx-auto">
          <Image 
            src={imageUrl} 
            alt={data.name} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Removed the black gradient shadow */}
          
          {/* Smaller LinkedIn indicator */}
          {data.linkedin && (
            <div className="absolute top-1 right-1 w-6 h-6 bg-[#0077b5] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
          )}
        </div>
        
        {/* Smaller text */}
        <div className="p-3 text-center">
          <h3 className="font-semibold text-sm text-white mb-0.5 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {data.name}
          </h3>
          <p className="text-purple-300 text-xs group-hover:text-purple-200 transition-colors duration-300">
            {data.designation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

  return (
    <Layout>
      <Head>
        <title>Administration | AAC - Advanced Academic Center</title>
        <meta
          name="description"
          content="Meet the leadership, advisors, and core committee members who guide the Advanced Academic Center towards excellence."
        />
      </Head>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
        </div>

        <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
          {/* Enhanced badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Leadership & Governance</span>
          </div>

          {/* Title with gradient effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Leadership
            </span>{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              @AAC
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
            Meet the visionary leaders, dedicated advisors, and dynamic team
            members who drive our mission of academic excellence and innovation
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {/* Navigation Tabs */}
        <div className="mb-12">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex flex-wrap justify-center gap-4">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <motion.button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                      activeCategory === tab.key
                        ? "bg-gradient-to-r " +
                          tab.color +
                          " text-white shadow-lg"
                        : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/30"
                    }`}
                  >
                    <IconComponent className="text-lg" />
                    <span className="font-medium">{tab.label}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        activeCategory === tab.key
                          ? "bg-white/20 text-white"
                          : "bg-white/10 text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <motion.div
          key={activeCategory}
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {activeCategory === "instigators" && (
            <>
              {/* Title Section */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 h-1.5 w-24 mx-auto mb-8 rounded-full shadow-lg"></div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    The Instigators
                  </span>
                </h2>

                <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
                  The visionary minds who conceived and established the Advanced
                  Academic Center, laying the foundation for academic excellence
                  and research innovation.
                </p>

                {/* Decorative dots */}
                <div className="flex justify-center items-center gap-3 mt-8">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-500"></div>
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse animation-delay-1000"></div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-8">
                {instigatorData.map((item, index) => (
                  <InstigatorCard key={item.id} data={item} index={index} />
                ))}
              </div>
            </>
          )}

          {activeCategory === "headadvisors" && (
            <>
              {/* Title Section */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-1.5 w-24 mx-auto mb-8 rounded-full shadow-lg"></div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Head Advisory Board
                  </span>
                </h2>

                <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
                  The guiding forces who envisioned and established the club,
                  shaping its mission and inspiring a legacy of leadership and
                  impact.
                </p>

                {/* Decorative dots */}
                <div className="flex justify-center items-center gap-3 mt-8">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse animation-delay-500"></div>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse animation-delay-1000"></div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-8">
                {headAdvisorData.map((item, index) => (
                  <HeadAdvisorCard key={item.id} data={item} index={index} />
                ))}
              </div>
            </>
          )}

          {activeCategory === "advisors" && (
            <>
              {/* Title Section */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-1.5 w-24 mx-auto mb-8 rounded-full shadow-lg"></div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Advisory Board
                  </span>
                </h2>

                <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
                  Distinguished leaders and academics who provide strategic
                  guidance and mentorship to shape the future of AAC.
                </p>

                {/* Decorative dots */}
                <div className="flex justify-center items-center gap-3 mt-8">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse animation-delay-500"></div>
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse animation-delay-1000"></div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="space-y-8">
                {advisorData.map((item, index) => (
                  <AdvisorCard key={item.id} data={item} index={index} />
                ))}
              </div>
            </>
          )}

          {activeCategory === "committee" && (
            <>
              {/* Title Section */}
              <motion.div variants={itemVariants} className="text-center mb-12">
                <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 h-1.5 w-24 mx-auto mb-8 rounded-full shadow-lg"></div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Core Committee
                  </span>
                </h2>

                <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
                  The dynamic student leadership team driving initiatives,
                  events, and the day-to-day operations of the Advanced Academic
                  Center.
                </p>

                {/* Year Selector */}
                <div className="flex justify-center gap-4 mt-8 mb-6">
                  {availableYears.map((year) => (
                    <motion.button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                        selectedYear === year
                          ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                          : "bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/20 hover:border-white/30"
                      }`}
                    >
                      {year}
                    </motion.button>
                  ))}
                </div>

                {/* Decorative dots */}
                <div className="flex justify-center items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse animation-delay-500"></div>
                  <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse animation-delay-1000"></div>
                </div>
              </motion.div>

              {/* Content Grid - More columns for smaller cards */}
<motion.div 
  key={selectedYear}
  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4"
  variants={pageVariants}
>
  {coreCommitteeData[selectedYear].map((item, index) => (
    <CommitteeMemberCard key={`${selectedYear}-${item.name}`} data={item} index={index} />
  ))}
</motion.div>
            </>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default AdministrationPage;
