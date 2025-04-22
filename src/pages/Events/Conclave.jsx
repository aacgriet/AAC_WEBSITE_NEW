// src/pages/Events/Conclave.js
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';

const Conclave = () => {
  const images = [
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085800/AAC-web/news_events/conclave%20data%20analytics/dataconclave2_z2ywmk.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085800/AAC-web/news_events/conclave%20data%20analytics/dataconclave5_c7y3bg.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085801/AAC-web/news_events/conclave%20data%20analytics/dataconclave4_kmen6q.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085800/AAC-web/news_events/conclave%20data%20analytics/dataconclave3_v0oibd.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085799/AAC-web/news_events/conclave%20data%20analytics/dataconclave1_vauoxi.jpg"
  ];

  const description = `"IF YOU ARE TALKING DATA SCIENCE, THERE IS NO SOLUTION, THERE ARE ONLY PROBLEMS AND DATA IS MONEY TODAY." -SATISH YELLANKI

<br /><br />

AAC GRIET had organized a conclave at the GRIET campus on 17th August 2019, the theme of the session being "DATA SCIENCE". The conclave proved to be an impactful platform where an array of inspirational group of people were brought together, led by a data scientist with cutting edge entrepreneurial skills-Mr. Satish Yellanki.

<br /><br />

Sathish Yellanki is having 20+ Years of I.T. Exposure in Various Areas of Computer Science Industry. He has been part of Relational, Object Relational And Object Oriented Databases in Design, Analysis and Coding. He has also designed various Domains Like Health Care, Education, Retail And E-Commerce. Mr.Satish has further extended his research to Data Ware Housing and Business Intelligence domains. He is an expert in System Analysis and Design with Relational And Dimensional Modeling and worked in critical areas like Performance, Tuning And Optimization of Oracle Database.`;

  return (
    <Layout>
      <Head>
        <title>Data Analytics Conclave | AAC Events</title>
        <meta name="description" content="Data Analytics Conclave: Exploring the future of data science at Advanced Academic Center" />
      </Head>
      
      <EventDetail
        title="DATA ANALYTICS CONCLAVE"
        description={description}
        images={images}
        date="April 2020"
        location="GRIET Campus, Hyderabad"
        organizer="Advanced Academic Center"
        cta={{ text: "Explore Similar Events", link: "/Events" }}
      />
    </Layout>
  );
};

export default Conclave;