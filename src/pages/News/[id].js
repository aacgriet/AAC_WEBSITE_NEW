import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Layout from '../../components/Layout';
import { getAllNews, getNewsById } from '../../lib/sanity';
import { motion } from 'framer-motion';

export async function getStaticPaths() {
  const news = await getAllNews();
  
  const paths = news.map((item) => ({
    params: { id: item._id },
  }));
  
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const news = await getNewsById(params.id);
  
  if (!news) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      news,
    },
    revalidate: 60 // Revalidate every minute
  };
}

const components = {
  block: {
    normal: ({ children }) => <p className="text-base md:text-lg mb-4 text-justify">{children}</p>,
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mb-6">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mb-3">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
};

const NewsDetail = ({ news }) => {
  const publishDate = news.publishedAt 
    ? new Date(news.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }) 
    : '';
    
  return (
    <Layout>
      <Head>
        <title>{news.title} | AAC News</title>
        <meta name="description" content={news.slug || 'AAC News Article'} />
      </Head>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <p className="text-gray-600 mb-4">Published on: {publishDate}</p>
            
            {news.mainImage && (
              <div className="relative w-full h-96 mb-8">
                <Image
                  src={news.mainImage.url}
                  alt={news.mainImage.altText || news.title}
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-5xl font-serif text-center mb-6">
              {news.title}
            </h1>
            
            <h2 className="text-xl mb-8">{news.slug}</h2>
            
            <div className="prose prose-lg max-w-none font-sans">
              {news._rawBody && (
                <PortableText
                  value={news._rawBody}
                  components={components}
                />
              )}
            </div>
            
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-2">Categories</h3>
              <p>{news.categories || "NOTICE"}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;