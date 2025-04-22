// src/pages/Events/CyberSecuritySeminar.js
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';

const CyberSecuritySeminar = () => {
  const images = [
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085800/AAC-web/news_events/Cyber/seminar5_dqqcl6.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085800/AAC-web/news_events/Cyber/seminar4_dwaux4.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085800/AAC-web/news_events/Cyber/seminar2_fmf5un.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085799/AAC-web/news_events/Cyber/seminar3_i9q4eu.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085799/AAC-web/news_events/Cyber/seminar1_lz6zzy.jpg"
  ];

  const description = `All India Seminar on "Cyber Security and Image Processing"

<br /><br />

A two day All India Seminar on 'Cyber Security and Image Processing" was held on 10th and 12th August. The importance of cyber security was highlighted with supporting test cases given by the Guest-of-Honor. Followed by the applications of cyber technology and the further advancements in it.

<br /><br />

Using the technology in the right way was encouraged, they gave a brief about visual cryptography which involves the segmentation of information into mutually exclusive and individually random looking components and sending them over different paths. The seminar enabled students to gain knowledge on various aspects of the Electronics Industry.`;

  return (
    <Layout>
      <Head>
        <title>Cyber Security Seminar | AAC Events</title>
        <meta name="description" content="All India Seminar on Cyber Security and Image Processing at Advanced Academic Center" />
      </Head>
      
      <EventDetail
        title="CYBER SECURITY SEMINAR"
        description={description}
        images={images}
        date="May 2020"
        location="GRIET Campus, Hyderabad"
        organizer="Advanced Academic Center"
        cta={{ text: "Learn More About Cyber Security", link: "/Research" }}
      />
    </Layout>
  );
};

export default CyberSecuritySeminar;