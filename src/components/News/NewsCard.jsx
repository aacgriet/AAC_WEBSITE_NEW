import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import NewsCard from '../../components/News/NewsCard';
import { getAllNews } from '../../lib/sanity';
import { motion } from 'framer-motion';

export async function getStaticProps() {
  const allNews = await getAllNews();
  return {
    props: {
      news: allNews,
    },
    revalidate: 60 // Revalidate every minute
  };
}

const NewsPage = ({ news }) => {
  return (
    <Layout>
      <Head>
        <title>News | AAC - Advanced Academic Center</title>
        <meta name="description" content="Latest news and updates from Advanced Academic Center, GRIET" />
      </Head>
      
      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center mb-16 font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          NEWS @AAC
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <NewsCard news={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;