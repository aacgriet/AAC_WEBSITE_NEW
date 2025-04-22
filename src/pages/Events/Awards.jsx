// src/pages/Events/Awards.js
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';

const Awards = () => {
  const images = [
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085804/AAC-web/news_events/aac%20award/award4_sdipga.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085803/AAC-web/news_events/aac%20award/award2_f2nfyb.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085803/AAC-web/news_events/aac%20award/award3_z3pyxp.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085803/AAC-web/news_events/aac%20award/award1_rpypyb.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085804/AAC-web/news_events/aac%20award/award4_sdipga.jpg"
  ];

  const description = `Creativity is thinking up new things. Innovation is doing new things.

<br /><br />

AAC is a platform for many students with ingenious thinking, who are willing to take some initiative in experimentation of the latest technologies. Students who complete projects under AAC will be certified every year through an 'Award ceremony'.

<br /><br />

This year, for the first time, the road show of the completed projects under AAC has been organised. The road show began with the inauguration by the Chief Guest - A.V.V.Prasad, NRSC; Guest of Honor - M.G.Sekharam, Chief Administrator of Gokaraju Educational Society and Dean of AAC - Dr.Ramamurthy Suri. Projects displayed covered booming Domains of today's world such as Internet of Things, Machine Learning, Deep Learning, Drone Technology, Web Development etc.`;

  return (
    <Layout>
      <Head>
        <title>AAC Awards Ceremony | AAC Events</title>
        <meta name="description" content="AAC Awards Ceremony: Recognizing innovation and excellence at Advanced Academic Center" />
      </Head>
      
      <EventDetail
        title="AAC AWARDS CEREMONY"
        description={description}
        images={images}
        date="January 2020"
        location="GRIET Campus, Hyderabad"
        organizer="Advanced Academic Center"
        cta={{ text: "Explore Projects", link: "/projects" }}
      />
    </Layout>
  );
};

export default Awards;