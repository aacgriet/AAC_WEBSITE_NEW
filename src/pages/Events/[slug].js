

// src/pages/Events/[slug].js - Database functionality with Premium UI
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';
import { useDatabase } from '@/hooks/useDatabase';

const DynamicEventPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: eventsData, loading, error } = useDatabase('events');
  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!loading && slug && eventsData && Array.isArray(eventsData) && eventsData.length > 0) {
      // Find event by slug or id
      const foundEvent = eventsData.find(e => {
        // Try to match by slug in path
        if (e.path && e.path.includes(slug)) return true;
        // Try to match by id
        if (e.id === slug || e._id === slug) return true;
        // Try to match by event name (converted to slug format)
        if (e.event || e.title) {
          const eventTitle = e.event || e.title;
          const eventSlug = eventTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
          const urlSlug = slug?.toLowerCase().replace(/[^a-z0-9]/g, '');
          return eventSlug === urlSlug;
        }
        return false;
      });
      
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        setNotFound(true);
      }
    }
  }, [slug, eventsData, loading]);

  // Loading state with modern design
  if (loading || !slug) {
    return (
      <Layout>
        <Head>
          <title>Loading Event | AAC Events</title>
        </Head>
        
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="text-center"
  >
    {/* Fixed: Added flex centering and proper positioning for spinner */}
    <div className="flex items-center justify-center relative mb-8">
      <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
    </div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-xl text-gray-400"
    >
      Loading event details...
    </motion.p>
  </motion.div>
</div>
      </Layout>
    );
  }

  // Error state with modern design
  if (error) {
    return (
      <Layout>
        <Head>
          <title>Error Loading Event | AAC Events</title>
        </Head>
        
        {/* Hero Section for Error */}
        <div className="relative bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 pt-24 pb-20 mb-12 overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-red-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
            {/* Enhanced badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Error Loading</span>
            </div>
            
            {/* Title with gradient effect */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-red-100 to-orange-200 bg-clip-text text-transparent">
                Error
              </span>{' '}
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Loading
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
              There was an error loading the event details
            </p>

            {/* Decorative dots */}
            <div className="flex justify-center items-center gap-3 mt-8">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-500"></div>
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Error Loading Event</h3>
            <p className="text-gray-400 text-lg mb-8">There was an error loading the event: {error}</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Retry
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">↻</span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => router.push('/Events')}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105"
              >
                Back to Events
              </button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // Not found state with modern design
  if (notFound || !event) {
    return (
      <Layout>
        <Head>
          <title>Event Not Found | AAC Events</title>
        </Head>
        
        {/* Hero Section for Error */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-red-400/20 to-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-red-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          </div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
            {/* Enhanced badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Error 404</span>
            </div>
            
            {/* Title with gradient effect */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-red-100 to-orange-200 bg-clip-text text-transparent">
                Event Not
              </span>{' '}
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Found
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
              The event you're looking for doesn't exist or has been removed
            </p>

            {/* Decorative dots */}
            <div className="flex justify-center items-center gap-3 mt-8">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse animation-delay-500"></div>
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse animation-delay-1000"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Event Not Found</h3>
            <p className="text-gray-400 text-lg mb-8">The event you're looking for doesn't exist or has been removed.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/Events')}
                className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Back to Events
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200 border border-white/20 hover:border-white/30 hover:scale-105"
              >
                Go Home
              </button>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // Render event detail with modern UI
  return (
    <Layout>
      <Head>
        <title>{event.event || event.title} | AAC Events</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={`${event.event || event.title} | AAC Events`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.img || event.mainImageUrl || event.images?.[0]} />
      </Head>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <EventDetail
          title={event.event || event.title}
          description={event.detailedDescription || event.description}
          images={event.images || (event.img ? [event.img] : event.mainImageUrl ? [event.mainImageUrl] : [])}
          date={event.date}
          location={event.location}
          organizer={event.organizer}
          category={event.category}
          status={event.status}
          cta={event.cta}
        />
      </motion.div>
    </Layout>
  );
};

export default DynamicEventPage;