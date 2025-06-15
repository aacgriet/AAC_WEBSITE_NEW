// src/pages/Events/[slug].js - Dynamic Event Detail Page
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';
import EventDetail from '@/components/Events/EventDetail';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

const DynamicEventPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: eventsData, loading } = useLocalStorage(STORAGE_KEYS.EVENTS);
  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!loading && slug && eventsData.length > 0) {
      // Find event by ID (slug)
      const foundEvent = eventsData.find(e => e.id === slug);
      
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        setNotFound(true);
      }
    }
  }, [slug, eventsData, loading]);

  // Loading state
  if (loading || !slug) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading event...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Not found state
  if (notFound || !event) {
    return (
      <Layout>
        <Head>
          <title>Event Not Found | AAC Events</title>
        </Head>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Event Not Found</h1>
            <p className="text-gray-400 mb-8">The event you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.push('/Events')}
              className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
            >
              Back to Events
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  // Render event detail
  return (
    <Layout>
      <Head>
        <title>{event.event} | AAC Events</title>
        <meta name="description" content={event.description} />
      </Head>
      
      <EventDetail
        title={event.event}
        description={event.detailedDescription || event.description}
        images={event.images || []}
        date={event.date}
        location={event.location}
        organizer={event.organizer}
        cta={event.cta}
      />
    </Layout>
  );
};

export default DynamicEventPage;