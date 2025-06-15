// src/pages/Events/Opulence2023.js
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';

const Opulence2023 = () => {
  const images = [
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/s1gv2z0j7nzctxmyyrxh.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825550/AAC-web/news_events/opulence2023/xewna19isjw3rzcdmf5f.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/elfucxyscblhhnazhxcu.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825380/AAC-web/news_events/opulence2023/gor2ysygdbqylqjgqybv.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/zdcnmfzelmh4u20wyr1x.jpg"
  ];

  const description = `Opulence is an esteemed event hosted by AAC, designed to inspire and educate the next generation of innovators and leaders. This year's edition witnessed the participation of over 400 students and 5 faculty members from GRIET, showcasing their enthusiasm for the latest trends in technology.
  
<br /><br />

The event featured distinguished speakers, including Pranali Bose, a seasoned Machine Learning Engineer, Raunak Bagga, the visionary Founder and CEO of Koolgen Interactives, and Srikanth Reddy Tenneti, the innovative Founder of The Great Honey Company. They shared invaluable insights and experiences, enriching the attendees' understanding of trending technologies.

<br /><br />

Opulence included various activities such as the Ideathon, where 21 teams presented their inventive ideas, and the G-Prime Coding Contest, attracting 42 teams that demonstrated their coding prowess through multiple challenging rounds. Additionally, engaging workshops on LLMs and GameCraft provided students with hands-on experience, further fostering their creativity and problem-solving skills.

<br /><br />

With its diverse array of activities, Opulence aims to empower participants to think critically and innovate boldly, setting the stage for future technological advancements and collaboration.`;

  return (
    <Layout>
      <Head>
        <title>Opulence 2023 | AAC Events</title>
        <meta name="description" content="Opulence: A Celebration of Innovation and Knowledge by Advanced Academic Center at GRIET" />
      </Head>
      
      <EventDetail
        title="OPULENCE"
        description={description}
        images={images}
        date="June 2024"
        location="GRIET Campus, Hyderabad"
        organizer="Advanced Academic Center"
        // cta={{ text: "Register for Next Event", link: "/Contact" }}
      />
    </Layout>
  );
};

export default Opulence2023;