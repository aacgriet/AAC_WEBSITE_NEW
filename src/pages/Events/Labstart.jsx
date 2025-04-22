// src/pages/Events/Labstart.js
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';

const Labstart = () => {
  const images = [
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085802/AAC-web/news_events/aac%20lab%20inaugural/inauguration7_gw5x8k.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085802/AAC-web/news_events/aac%20lab%20inaugural/inauguration1_b2oyum.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085802/AAC-web/news_events/aac%20lab%20inaugural/inauguration8_rmwzso.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085802/AAC-web/news_events/aac%20lab%20inaugural/inauguration3_ndi6na.jpg",
    "https://res.cloudinary.com/aacgriet/image/upload/v1666085801/AAC-web/news_events/aac%20lab%20inaugural/inauguration2_qgnkgz.jpg"
  ];

  const description = `Creativity is thinking up new things. Innovation is doing new things.

<br /><br />

AAC stands for learning through exploration, experimentation and experience. To create a novel environment to foster scientific temper, innovation and creativity amongst students, the committee set up a Lab in room number 3614 in the Block 3 for conducting conclaves and to carry out research level projects.

<br /><br />

Along with all the dignitaries, Dr. M.G. Sekharam sir motivated the students to indulge in more hands-on-experience in the lab and advised the mentors of AAC to turn the classroom environment into a Laboratory experience of learning. Boosting their morale Dr. J. Praveen sir urged them to dare to dream beyond the mediocre. Dr. S. Ramamurthy sir, expressed his gratitude towards the college management for the remarkable gesture of aiding the AAC students with the latest technology and urged the students to make great use of it.`;

  return (
    <Layout>
      <Head>
        <title>AAC Lab Inauguration | AAC Events</title>
        <meta name="description" content="AAC Lab Inauguration: A new space for innovation and research at Advanced Academic Center" />
      </Head>
      
      <EventDetail
        title="AAC LAB INAUGURATION"
        description={description}
        images={images}
        date="June 2020"
        location="Block 3, Room 3614, GRIET Campus"
        organizer="Advanced Academic Center"
        cta={{ text: "Explore Research Projects", link: "/projects" }}
      />
    </Layout>
  );
};

export default Labstart;