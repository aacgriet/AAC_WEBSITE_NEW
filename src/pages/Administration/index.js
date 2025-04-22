// src/pages/Administration/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const AdministrationPage = () => {
  // State to track the active category
  const [activeCategory, setActiveCategory] = useState('instigators');
  
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
  
  const advisorData = [
    {
      id: "1",
      name: "Dr. Jandhyala N Murthy",
      occupation: "DIRECTOR, GRIET",
      about:
        "Dr. Jandhyala N Murthy after voluntarily taking retirement from the IAF as a Wing Commander in 2001,immediately joined as a professor in the Department of Mechanical Engineering at GRIET.Later on taking up the position as the Director of GRIET since 31 January 2018, after a successful tenure as the Principal of GRIET since March 2004.His areas of interest span the Thermal Engineering domain, Gas Turbine Combustion Chambers, simulation and education.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100146/AAC-web/mentors/Dr-Jandhyala-Murthy_tgqu8z.jpg",
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
    {
      id: "5",
      name: "Dr. Arvind Vishnubhatla",
      occupation: "PROFESSOR, ECE GRIET",
      about:
        "Dr. Arvind Vishnubhatla is currently working as Professor at GRIET.His areas of research and interests include Signal Processing, Embedded Systems, System Design. He worked on GSM switch Microlite Development of a Distributed digital control system for the automation of Steel plants.",
      image:
        "https://res.cloudinary.com/aacgriet/image/upload/v1664100146/AAC-web/mentors/aravind_gnf36b.jpg",
    },
  ];
  
  const coreCommitteeData = [
    {
      Id: "1",
      Name: "Abhiram Pedamallu",
      Designation: "President",
      Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160195/AAC-web/corecommittee2024/AbhiramPedamallu.jpg",
    },
    {
      Id: "3",
      Name: "V. Dinesh Chandra",
      Designation: "Vice President",
      Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160196/AAC-web/corecommittee2024/DineshChandraVakkapatla.jpg",
    },
    {
      Id: "5",
      Name: "Abhiram Dodda",
      Designation: "Technical Coordinator",
      Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160195/AAC-web/corecommittee2024/AbhiramDodda.jpg",
    },
    {
      Id: "6",
      Name: "Seetaram Koushik",
      Designation: "Database Coordinator",
      Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160199/AAC-web/corecommittee2024/SeetaramKoushik.jpg",
    },
    {
      Id: "7",
      Name: "Manav",
      Designation: "Finance Coordinator",
      Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160196/AAC-web/corecommittee2024/Manav.webp",
    },
    {
      Id: "8",
      Name: "Srija Cherukuri",
      Designation: "PR Coordinator",
      Image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160199/AAC-web/corecommittee2024/SrijaCherukuri.jpg",
    },
  ];
  
  // Get the active data based on category
  const getActiveData = () => {
    switch (activeCategory) {
      case 'instigators':
        return instigatorData;
      case 'advisors':
        return advisorData;
      case 'committee':
        return coreCommitteeData;
      default:
        return instigatorData;
    }
  };
  
  // Components for different display types
  const InstigatorCard = ({ data }) => (
    <motion.div 
      variants={itemVariants}
      className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row"
    >
      <div className="md:w-1/3 p-8 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image 
            src={data.image} 
            alt={data.name} 
            fill 
            className="object-cover"
          />
        </div>
      </div>
      <div className="md:w-2/3 p-8">
        <h3 className="text-2xl font-bold mb-4">{data.name}</h3>
        <p className="text-gray-600 leading-relaxed">{data.about}</p>
      </div>
    </motion.div>
  );
  
  const AdvisorCard = ({ data }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row"
    >
      <div className="md:w-1/3 p-8 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image 
            src={data.image} 
            alt={data.name} 
            fill 
            className="object-cover"
          />
        </div>
      </div>
      <div className="md:w-2/3 p-8">
        <h3 className="text-2xl font-bold mb-2">{data.name}</h3>
        <h4 className="text-xl text-blue-600 mb-4">{data.occupation}</h4>
        <p className="text-gray-600 leading-relaxed">{data.about}</p>
      </div>
    </motion.div>
  );
  
  const CommitteeMemberCard = ({ data }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-xl overflow-hidden"
    >
      <div className="aspect-square relative">
        <Image 
          src={data.Image} 
          alt={data.Name} 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white">{data.Designation}</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{data.Name}</h3>
        <p className="text-blue-600">{data.Designation}</p>
      </div>
    </motion.div>
  );
  
  // Render category content
  const renderCategoryContent = () => {
    const activeData = getActiveData();
    
    if (activeCategory === 'committee') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeData.map((item) => (
            <CommitteeMemberCard key={item.Id} data={item} />
          ))}
        </div>
      );
    }
    
    return (
      <div className="space-y-8">
        {activeData.map((item) => {
          if (activeCategory === 'instigators') {
            return <InstigatorCard key={item.id} data={item} />;
          }
          return <AdvisorCard key={item.id} data={item} />;
        })}
      </div>
    );
  };
  
  return (
    <Layout>
      <Head>
        <title>Administration | AAC - Advanced Academic Center</title>
        <meta name="description" content="Meet the administration team at Advanced Academic Center, GRIET" />
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
              Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet the People Behind AAC
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated faculty and students working together to advance research and innovation at GRIET.
            </p>
          </motion.div>
          
          {/* Category tabs */}
          <div className="flex flex-wrap items-center justify-center space-x-2 md:space-x-4 mb-12">
            {[
              { id: 'instigators', label: 'Instigators' },
              { id: 'advisors', label: 'Advisors' },
              { id: 'committee', label: 'Core Committee' },
            ].map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
          
          {/* Content area */}
          <motion.div
            key={activeCategory}
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            {renderCategoryContent()}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AdministrationPage;