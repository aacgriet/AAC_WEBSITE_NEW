import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import EventCard from '../../components/Events/EventCard';
import { motion } from 'framer-motion';

const eventsData = [
  {
    id: "opulence2023",
    event: "Opulence 2024",
    path: "/Events/Opulence2023",
    date: "JUNE 2024",
    img: "https://res.cloudinary.com/aacgriet/image/upload/v1730825402/AAC-web/news_events/opulence2023/r8lt4zd7x5bmvmcvytqh.jpg"
  },
  {
    id: "expo2023",
    event: "AAC Expo 2023",
    path: "/Events/Expo2023",
    date: "DEC 2023",
    img: "https://res.cloudinary.com/aacgriet/image/upload/v1730826047/AAC-web/news_events/expo2023/mskbwi5ieigki5qactl0.jpg"
  },
  {
    id: "expo2022",
    event: "AAC Expo 2022",
    path: "/Events/Expo2022",
    date: "OCT 2022",
    img: "https://res.cloudinary.com/aacgriet/image/upload/v1730826433/AAC-web/news_events/expo2022/wgrd6p6gnst2pqropeht.jpg"
  },
  {
    id: "labstart",
    event: "AAC Lab Inauguration",
    path: "/Events/Labstart",
    date: "JUNE 2020",
    img: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_350,w_350/v1664100159/AAC-web/news_events/inauguration_xwgkz3.jpg"
  },
  {
    id: "conclave",
    event: "Conclave Data Analytics",
    path: "/Events/Conclave",
    date: "April 2020",
    img: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_350,w_350/v1664100157/AAC-web/news_events/dataconclave_ienjzt.jpg"
  },
  {
    id: "cybersecurity",
    event: "Cyber Security Seminar",
    path: "/Events/CyberSecuritySeminar",
    date: "May 2020",
    img: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_350,w_350/v1664100161/AAC-web/news_events/inauguration8_okhjsl.jpg"
  },
  {
    id: "awards",
    event: "Award Function",
    path: "/Events/Awards",
    date: "Jan 2020",
    img: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_350,w_350/v1664100188/AAC-web/news_events/Virtual_Award_Ceremony_bxj2xj.png"
  }
];

const EventsPage = () => {
  return (
    <Layout>
      <Head>
        <title>Events | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore events organized by Advanced Academic Center at GRIET" />
      </Head>
      
      <div className="py-20">
        <div className="container mx-auto px-4 mb-20">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold font-serif text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Events
          </motion.h1>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 container mx-auto px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {eventsData.map((event) => (
            <EventCard 
              key={event.id}
              event={event.event}
              date={event.date}
              path={event.path}
              img={event.img}
            />
          ))}
        </motion.div>
      </div>
    </Layout>
  );
};

export default EventsPage;