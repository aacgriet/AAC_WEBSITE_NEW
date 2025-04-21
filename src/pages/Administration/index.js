import React from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Facultyadvisor from '../../components/Administration/Facultyadvisor';
import Advisory from '../../components/Administration/Advisory';
import CoreCommittee from '../../components/Administration/CoreCommittee';
import { motion } from 'framer-motion';

const AdministrationPage = () => {
  return (
    <Layout>
      <Head>
        <title>Administration | AAC - Advanced Academic Center</title>
        <meta name="description" content="Meet the administration team at Advanced Academic Center, GRIET" />
      </Head>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Facultyadvisor />
        <Advisory />
        <CoreCommittee />
      </motion.div>
    </Layout>
  );
};

export default AdministrationPage;