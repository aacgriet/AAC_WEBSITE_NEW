// src/pages/Events/Expo2023.js
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';

const Expo2023 = () => {
  const images = [
    "https://res.cloudinary.com/aacgriet/image/upload/v1730537988/AAC-web/news_events/expo2023/x8cavlem9zanuaoqvbbs.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/wxvfrd1n979puot2zgny.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/hii5cxqnnt9ekjikleyq.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/lvkx4w5x2uxolt150lmh.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730537987/AAC-web/news_events/expo2023/fnrbjznpwfwttmdv3ufi.jpg"
  ];

  const description = `Everyone is warmly invited to the highly anticipated 2023 Expo, proudly hosted by AAC. This year's Expo was a tremendous success, showcasing a diverse array of revolutionary innovations that are set to transform industries and enhance everyday life. A project reaches its pinnacle when it aligns with your aspirations, enabling you to flourish alongside it.

<br /><br />

Expos serve as global platforms designed to tackle the most urgent challenges facing humanity today, offering immersive experiences that delve into a carefully curated theme through engaging and interactive activities.

<br /><br />

The 2023 Expo aspires to empower individuals to become architects of the future. This involves not only spotlighting solutions to pressing societal issues through the dynamic Expo Live programme but also inspiring attendees with creative concepts and practical approaches to overcome obstacles, thus contributing to the collective advancement of humanity.`;

  return (
    <Layout>
      <Head>
        <title>AAC Expo 2023 | AAC Events</title>
        <meta name="description" content="AAC Expo 2023: Showcasing innovation and technology at Advanced Academic Center" />
      </Head>
      
      <EventDetail
        title="AAC EXPO 2023"
        description={description}
        images={images}
        date="December 2023"
        location="GRIET Campus, Hyderabad"
        organizer="Advanced Academic Center"
        cta={{ text: "Explore All Expos", link: "/Events" }}
      />
    </Layout>
  );
};

export default Expo2023;