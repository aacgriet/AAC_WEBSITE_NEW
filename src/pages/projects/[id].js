import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import Layout from '../../components/Layout';
import { getAllProjects, getProjectById } from '../../lib/sanity';
import { motion } from 'framer-motion';

export async function getStaticPaths() {
  const projects = await getAllProjects();
  
  const paths = projects.map((project) => ({
    params: { id: project._id },
  }));
  
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const project = await getProjectById(params.id);
  
  if (!project) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: {
      project,
    },
    revalidate: 60 // Revalidate every minute
  };
}

const components = {
  block: {
    normal: ({ children }) => <p className="text-base md:text-lg mb-4 font-sans">{children}</p>,
    h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mb-6 font-serif">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mb-3 font-serif">{children}</h3>,
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

const ProjectDetail = ({ project }) => {
  const publishDate = project.publishedAt 
    ? new Date(project.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      }) 
    : '';
  
  return (
    <Layout>
      <Head>
        <title>{project.title} | AAC Projects</title>
        <meta name="description" content={project.slug || 'AAC Project Details'} />
      </Head>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 py-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center"
            >
              {project.mainImage ? (
                <Image
                  src={project.mainImage.url}
                  alt={project.mainImage.altText || project.title}
                  width={600}
                  height={500}
                  className="rounded-md object-cover shadow-lg"
                />
              ) : (
                <div className="bg-gray-200 h-96 w-full rounded-md flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-6">
                <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4 leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-6">
                  {project.slug}
                </p>
              </div>
              
              <div className="mb-8 border-t border-b border-gray-200 py-6 space-y-6">
                <div>
                  <h3 className="text-lg text-amber-600 font-medium uppercase mb-4">
                    Project Team Members
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.names && project.names.map((name, index) => (
                      <p key={index} className="font-sans">{name}</p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg text-amber-600 font-medium uppercase mb-4">
                    Project Details
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-bold">DATE:</span> {publishDate}
                    </li>
                    <li>
                      <span className="font-bold">Team:</span> {project.author}
                    </li>
                    <li>
                      <span className="font-bold">Domain:</span> {project.categories}
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold font-serif mb-6">Project Description</h2>
            <div className="prose prose-lg max-w-none">
              {project._rawBody && (
                <PortableText
                  value={project._rawBody}
                  components={components}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetail;