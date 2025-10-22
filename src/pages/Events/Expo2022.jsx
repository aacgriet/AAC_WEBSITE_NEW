// src/pages/Events/Expo2022.js
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';

const Expo2022 = () => {
  const images = [
    "https://res.cloudinary.com/aacgriet/image/upload/v1667145729/AAC-web/news_events/expo2022/DSC_0020_r9zqem.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1667145731/AAC-web/news_events/expo2022/DSC_0008_rrbc8y.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1667145731/AAC-web/news_events/expo2022/DSC_0462_kfsrq6.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1667145730/AAC-web/news_events/expo2022/DSC_0569_d1dg8n.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1667145733/AAC-web/news_events/expo2022/DSC_0383_cqn39u.jpg"
  ];

  const description = `Everyone is invited to the 2022 expo, says AAC. The 2022 Expo was a success, featuring a variety of cutting-edge innovations. A project is complete when it starts working for you, rather than you working for it.

<br /><br />

Expos are international gatherings with the goal of discovering answers to the most important problems that humanity is currently experiencing by providing a trip inside a selected theme through exciting and immersive activities.

<br /><br />

This Expo wants to give individuals the power to influence the future. This involves promoting solutions to societal concerns through the Expo Live programme and inspiring visitors with concepts for how to address problems and contribute to the advancement of humanity.`;

  return (
    <Layout>
      <Head>
        <title>AAC Expo 2022 | AAC Events</title>
        <meta name="description" content="AAC Expo 2022: Showcasing innovation and technology at Advanced Academic Center" />
      </Head>
      
      <EventDetail
        title="AAC EXPO 2022"
        description={description}
        images={images}
        date="October 2022"
        location="GRIET Campus, Hyderabad"
        organizer="Advanced Academic Center"
        cta={{ text: "View Next Expo", link: "/Events/Expo2023" }}
      />
    </Layout>
  );
};

export default Expo2022;