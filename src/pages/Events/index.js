
// src/pages/Events/index.js - Database functionality with Premium UI
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import { useDatabase } from '@/hooks/useDatabase';

const EventCard = ({ event, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <Image
          src={event.img || event.mainImageUrl || 'https://via.placeholder.com/400x200/1a2535/ffffff?text=Event'}
          alt={event.event || event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30 backdrop-blur-sm">
            {event.date || 'TBD'}
          </span>
        </div>

        {/* Status Badge */}
        {event.status && (
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-medium border backdrop-blur-sm ${
              event.status === 'completed' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
              event.status === 'upcoming' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
              event.status === 'ongoing' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
              'bg-gray-500/20 text-gray-300 border-gray-500/30'
            }`}>
              {event.status}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col relative z-10">
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {event.event || event.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
          {event.description || 'No description available for this event.'}
        </p>

        {/* Location */}
        {event.location && (
          <p className="text-gray-500 text-xs mb-4 flex items-center gap-1">
            <span>📍</span>
            {event.location}
          </p>
        )}
        
        {/* Action Button */}
        <Link
          href={event.path || `/Events/${event.id || event._id}`}
          className="group/btn inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105 mt-auto"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            View Event
            <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        </Link>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const { data: eventsData, loading, error } = useDatabase('events');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Process events data safely
  const safeEventsData = eventsData && Array.isArray(eventsData) ? eventsData : [];

  // Extract unique categories, years, and statuses from events data
  const categories = ['All Categories', ...new Set(safeEventsData.map(event => event.category).filter(Boolean))];
  const years = ['All Years', ...Array.from(new Set(safeEventsData.map(event => {
    const year = event.date ? new Date(event.date).getFullYear() : null;
    return year;
  }).filter(Boolean))).sort((a, b) => b - a)];
  const statuses = ['All Status', ...new Set(safeEventsData.map(event => event.status).filter(Boolean))];

  // Filter events
  const filteredEvents = safeEventsData.filter(event => {
    const eventTitle = event.event || event.title || '';
    const eventDescription = event.description || '';
    
    const matchesSearch = eventTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         eventDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All Categories' || event.category === categoryFilter;
    const matchesStatus = statusFilter === 'All Status' || event.status === statusFilter;
    const eventYear = event.date ? new Date(event.date).getFullYear() : null;
    const matchesYear = yearFilter === 'All Years' || eventYear === parseInt(yearFilter);
    
    return matchesSearch && matchesCategory && matchesYear && matchesStatus;
  });

  // Sort events by date (newest first)
  const sortedEvents = filteredEvents.sort((a, b) => {
    const dateA = new Date(a.actualDate || a.date || a.createdAt || 0);
    const dateB = new Date(b.actualDate || b.date || b.createdAt || 0);
    return dateB - dateA;
  });

  // Loading state
  if (loading) {
    return (
      <Layout>
        <Head>
          <title>Events | AAC - Advanced Academic Center</title>
          <meta name="description" content="Explore events organized by Advanced Academic Center at GRIET" />
        </Head>
        
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <div className="relative mb-8 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{animationDelay: '150ms'}}></div>
        </div>
        <p className="text-xl text-gray-400">Loading events...</p>
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
        
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </div>

          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
          </div>
          
          <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
            {/* Enhanced badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Events & Activities</span>
            </div>
            
            {/* Title with gradient effect */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
                Events &
              </span>{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Activities
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
              Discover workshops, seminars, competitions, and exhibitions organized by AAC
            </p>

            {/* Decorative dots */}
            <div className="flex justify-center items-center gap-3 mt-8">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 pb-24">
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">⚠️</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Unable to Load Events</h3>
            <p className="text-gray-400 text-lg mb-8">There was an error loading the events: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Retry
                <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Events | AAC - Advanced Academic Center</title>
        <meta name="description" content="Explore events organized by Advanced Academic Center at GRIET" />
      </Head>
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
          {/* Enhanced badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Events & Activities</span>
          </div>
          
          {/* Title with gradient effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Events &
            </span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Activities
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
            Discover workshops, seminars, competitions, and exhibitions organized by AAC
          </p>

          {/* Decorative dots */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
            <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-24">
        {/* Filter Controls */}
        <div className="mb-12">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
                  Search Events
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all duration-200"
                />
              </div>
              
              {/* Category filter */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-3">
                  Filter by Category
                </label>
                <select
                  id="category"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-slate-800 text-white">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Year filter */}
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-3">
                  Filter by Year
                </label>
                <select
                  id="year"
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
                >
                  {years.map(year => (
                    <option key={year} value={year} className="bg-slate-800 text-white">
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status filter */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-400 mb-3">
                  Filter by Status
                </label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-slate-800 text-white">
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-8">
          <p className="text-lg text-gray-400">
            Showing <span className="text-white font-medium">{sortedEvents.length}</span> of <span className="text-white font-medium">{safeEventsData.length}</span> events
          </p>
        </div>

        {/* Events Grid or Empty State */}
        {sortedEvents.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
              <span className="text-4xl">📅</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              {safeEventsData.length === 0 ? 'No Events Yet' : 'No Events Found'}
            </h3>
            <p className="text-gray-400 text-lg">
              {safeEventsData.length === 0 
                ? 'Events will be displayed here once they are added.' 
                : 'Try adjusting your search criteria to find more events.'}
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { 
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sortedEvents.map((event, index) => (
              <EventCard key={event.id || event._id || index} event={event} index={index} />
            ))}
          </motion.div>
        )}

        {/* Statistics Section */}
        {safeEventsData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Event Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">
                  {safeEventsData.length}
                </div>
                <div className="text-gray-400">Total Events</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {safeEventsData.filter(e => e.status === 'completed').length}
                </div>
                <div className="text-gray-400">Completed</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {safeEventsData.filter(e => e.status === 'upcoming').length}
                </div>
                <div className="text-gray-400">Upcoming</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {safeEventsData.filter(e => e.status === 'ongoing').length}
                </div>
                <div className="text-gray-400">Ongoing</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default EventsPage;