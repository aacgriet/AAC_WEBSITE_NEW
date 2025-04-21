import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import EventSwiper from '../../components/Events/EventSwiper';
import { motion } from 'framer-motion';

const Opulence2023 = () => {
  const images = [
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/s1gv2z0j7nzctxmyyrxh.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825550/AAC-web/news_events/opulence2023/xewna19isjw3rzcdmf5f.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/elfucxyscblhhnazhxcu.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825380/AAC-web/news_events/opulence2023/gor2ysygdbqylqjgqybv.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/zdcnmfzelmh4u20wyr1x.jpg"
  ];

  return (
    <Layout>
      <Head>
        <title>Opulence 2023 | AAC Events</title>
        <meta name="description" content="Opulence 2023 - A Celebration of Innovation and Knowledge by AAC" />
      </Head>
      
      <div className="py-10">
        <motion.h1 
          className="text-4xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          OPULENCE
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <EventSwiper images={images} />
        </motion.div>
        
        <div className="container mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-serif font-bold mb-6">
              AAC proudly presents Opulence: A Celebration of Innovation and Knowledge.
            </h2>
            
            <div className="prose prose-lg max-w-none">
              <p className="font-sans py-5">
                Opulence is an esteemed event hosted by AAC, designed to inspire and
                educate the next generation of innovators and leaders. This year's
                edition witnessed the participation of over 400 students and 5
                faculty members from GRIET, showcasing their enthusiasm for the
                latest trends in technology.
                <br /><br />
                The event featured distinguished speakers, including Pranali Bose, a
                seasoned Machine Learning Engineer, Raunak Bagga, the visionary
                Founder and CEO of Koolgen Interactives, and Srikanth Reddy Tenneti,
                the innovative Founder of The Great Honey Company. They shared
                invaluable insights and experiences, enriching the attendees'
                understanding of trending technologies.
                <br /><br />
                Opulence included various activities such as the Ideathon, where 21
                teams presented their inventive ideas, and the G-Prime Coding
                Contest, attracting 42 teams that demonstrated their coding prowess
                through multiple challenging rounds. Additionally, engaging
                workshops on LLMs and GameCraft provided students with hands-on
                experience, further fostering their creativity and problem-solving
                skills.
                <br /><br />
                With its diverse array of activities, Opulence aims to empower
                participants to think critically and innovate boldly, setting the
                stage for future technological advancements and collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Opulence2023;