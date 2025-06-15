// src/pages/Events/index.js - Updated to use localStorage data
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const EventCard = ({ event, isActive, onClick }) => {
  return (
    <motion.div 
      layout
      className={`relative cursor-pointer rounded-xl overflow-hidden shadow-lg border border-gray-700 ${isActive ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image 
          src={event.img} 
          alt={event.event} 
          fill 
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-end z-10">
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/50 backdrop-blur-sm text-blue-300 rounded-full border border-blue-800/30">
            {event.date}
          </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{event.event}</h3>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-gray-200 mb-4">{event.description}</p>
              <Link 
                href={`/Events/${event.id}`}
                className="inline-block px-4 py-2 bg-blue-900/50 backdrop-blur-sm border border-blue-700/50 text-white rounded-full hover:bg-blue-800/50 transition-colors"
              >
                View Event
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const [activeEventId, setActiveEventId] = useState(null);
  const { data: eventsData, loading, error } = useLocalStorage(STORAGE_KEYS.EVENTS);
  const containerRef = useRef(null);
  
  const handleClick = (id) => {
    if (activeEventId === id) {
      setActiveEventId(null);
    } else {
      setActiveEventId(id);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Events | AAC - Advanced Academic Center</title>
          <meta name="description" content="Explore events organized by Advanced Academic Center at GRIET" />
        </Head>
        
        <PageHero 
          title="Events & Activities" 
          subtitle="Discover workshops, seminars, competitions, and exhibitions organized by AAC"
          tag="Happenings"
        />
        
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading events...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error) {
    return (
      <Layout>
        <Head>
          <title>Events | AAC - Advanced Academic Center</title>
        </Head>
        
        <PageHero 
          title="Events & Activities" 
          subtitle="Discover workshops, seminars, competitions, and exhibitions organized by AAC"
          tag="Happenings"
        />
        
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Unable to Load Events</h2>
            <p className="text-gray-400 mb-8">There was an error loading the events. Please try again later.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // No events state
  if (eventsData.length === 0) {
    return (
      <Layout>
        <Head>
          <title>Events | AAC - Advanced Academic Center</title>
        </Head>
        
        <PageHero 
          title="Events & Activities" 
          subtitle="Discover workshops, seminars, competitions, and exhibitions organized by AAC"
          tag="Happenings"
        />
        
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="text-6xl mb-4">📅</div>
            <h2 className="text-2xl font-bold text-white mb-4">No Events Yet</h2>
            <p className="text-gray-400 mb-8">Events will be displayed here once they are added.</p>
            
          </div>
        </div>
      </Layout>
    );
  }

  // Sort events by date (newest first)
  const sortedEvents = eventsData.sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB - dateA;
  });
  
  return (
    <Layout>
      <Head>
        <title>Events | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore events organized by Advanced Academic Center at GRIET" />
      </Head>
      
      <PageHero 
        title="Events & Activities" 
        subtitle="Discover workshops, seminars, competitions, and exhibitions organized by AAC"
        tag="Happenings"
      />
      
      <div className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {/* Events Timeline */}
          <div className="mb-12">
            <div className="relative flex overflow-x-auto pb-4">
              <div className="absolute h-0.5 bg-gray-700 bottom-4 left-0 right-0"></div>
              {sortedEvents.map((event, index) => (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative flex-shrink-0 flex flex-col items-center mx-6 first:ml-0 cursor-pointer"
                  onClick={() => handleClick(event.id)}
                >
                  <span className="text-sm text-gray-400">{event.date}</span>
                  <div className={`w-4 h-4 rounded-full mt-1 mb-1 ${activeEventId === event.id ? 'bg-blue-600 scale-125' : 'bg-gray-600'} transition-all duration-300`}></div>
                  <span className={`text-sm font-medium ${activeEventId === event.id ? 'text-blue-400' : 'text-gray-300'} transition-colors duration-300 text-center max-w-24`}>
                    {event.event}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Events Grid */}
          <motion.div 
            ref={containerRef}
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {sortedEvents.map((event) => (
                <EventCard 
                  key={event.id}
                  event={event}
                  isActive={activeEventId === event.id}
                  onClick={() => handleClick(event.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Call to Action */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl shadow-xl p-8 text-white border border-blue-800/30">
              <h3 className="text-2xl font-bold mb-4">Want to participate in our upcoming events?</h3>
              <p className="mb-6 text-blue-100">Join our community of innovators and be the first to know about our latest activities.</p>
              <button className="px-6 py-3 bg-[#0e1421] text-white rounded-full font-medium hover:bg-[#172E7C]/80 transition-colors border border-blue-800/30">
                Subscribe to Updates
              </button>
            </div>
          </motion.div> */}
        </div>
      </div>
    </Layout>
  );
};

export default EventsPage;