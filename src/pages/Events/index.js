// // src/pages/Events/index.js - Updated with Modern Premium UI
// import React, { useState } from 'react';
// import Head from 'next/head';
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import Layout from '@/components/Layout';
// import { useLocalStorage } from '@/hooks/useLocalStorage';
// import { STORAGE_KEYS } from '@/lib/storage';

// const EventCard = ({ event, index }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.6 }}
//       whileHover={{ y: -8, scale: 1.03 }}
//       className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Gradient overlay on hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
//       {/* Event Image */}
//       <div className="relative h-48 overflow-hidden rounded-t-2xl">
//         <Image
//           src={event.img || event.images?.[0] || 'https://via.placeholder.com/400x200/1a2535/ffffff?text=Event'}
//           alt={event.event}
//           fill
//           className="object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
//         {/* Date Badge */}
//         <div className="absolute top-4 left-4">
//           <span className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/30 backdrop-blur-sm">
//             {event.date}
//           </span>
//         </div>
//       </div>
      
//       {/* Content */}
//       <div className="p-6 flex-1 flex flex-col relative z-10">
//         <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
//           {event.event}
//         </h3>
        
//         <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
//           {event.description || 'No description available for this event.'}
//         </p>
        
//         {/* Action Button */}
//         <Link
//           href={`/Events/${event.id}`}
//           className="group/btn inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105 mt-auto"
//         >
//           <span className="relative z-10 flex items-center justify-center gap-2">
//             View Event
//             <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//           </span>
//           <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//         </Link>
//       </div>
//     </motion.div>
//   );
// };

// const EventsPage = () => {
//   const { data: eventsData, loading, error } = useLocalStorage(STORAGE_KEYS.EVENTS);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('All Categories');
//   const [yearFilter, setYearFilter] = useState('All Years');

//   // Extract unique categories and years from events data
//   const categories = ['All Categories', ...new Set(eventsData.map(event => event.category).filter(Boolean))];
//   const years = ['All Years', ...Array.from(new Set(eventsData.map(event => {
//     const year = event.date ? new Date(event.date).getFullYear() : null;
//     return year;
//   }).filter(Boolean))).sort((a, b) => b - a)];

//   // Filter events
//   const filteredEvents = eventsData.filter(event => {
//     const matchesSearch = event.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()));
//     const matchesCategory = categoryFilter === 'All Categories' || event.category === categoryFilter;
//     const eventYear = event.date ? new Date(event.date).getFullYear() : null;
//     const matchesYear = yearFilter === 'All Years' || eventYear === parseInt(yearFilter);
    
//     return matchesSearch && matchesCategory && matchesYear;
//   });

//   // Sort events by date (newest first)
//   const sortedEvents = filteredEvents.sort((a, b) => {
//     const dateA = new Date(a.createdAt || a.date || 0);
//     const dateB = new Date(b.createdAt || b.date || 0);
//     return dateB - dateA;
//   });

//   // Loading state
//   if (loading) {
//     return (
//       <Layout>
//         <Head>
//           <title>Events | AAC - Advanced Academic Center</title>
//           <meta name="description" content="Explore events organized by Advanced Academic Center at GRIET" />
//         </Head>
        
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//           <div className="text-center">
//             <div className="relative mb-8">
//               <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
//             </div>
//             <p className="text-xl text-gray-400">Loading events...</p>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Layout>
//         <Head>
//           <title>Events | AAC - Advanced Academic Center</title>
//         </Head>
        
//         {/* Hero Section */}
//         <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
//           {/* Animated background blobs */}
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//             <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
//             <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
//           </div>

//           {/* Animated grid pattern */}
//           <div className="absolute inset-0 opacity-5">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
//           </div>
          
//           <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
//             {/* Enhanced badge */}
//             <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
//               <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//               <span className="text-sm font-medium">Events & Activities</span>
//             </div>
            
//             {/* Title with gradient effect */}
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
//                 Events &
//               </span>{' '}
//               <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
//                 Activities
//               </span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
//               Discover workshops, seminars, competitions, and exhibitions organized by AAC
//             </p>

//             {/* Decorative dots */}
//             <div className="flex justify-center items-center gap-3 mt-8">
//               <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//               <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
//               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
//             </div>
//           </div>
//         </div>
        
//         <div className="container mx-auto px-4 pb-24">
//           <div className="text-center py-20">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <span className="text-4xl">⚠️</span>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">Unable to Load Events</h3>
//             <p className="text-gray-400 text-lg mb-8">There was an error loading the events. Please try again later.</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="group/btn px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105"
//             >
//               <span className="relative z-10 flex items-center justify-center gap-2">
//                 Retry
//                 <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
//               </span>
//               <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//             </button>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <Head>
//         <title>Events | AAC - Advanced Academic Center</title>
//         <meta name="description" content="Explore events organized by Advanced Academic Center at GRIET" />
//       </Head>
      
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-24 pb-20 mb-12 overflow-hidden">
//         {/* Animated background blobs */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
//           <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
//           <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
//         </div>

//         {/* Animated grid pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12 animate-pulse"></div>
//         </div>
        
//         <div className="container mx-auto mt-7 px-4 relative z-10 text-center">
//           {/* Enhanced badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white rounded-full mb-6 border border-white/20 shadow-lg">
//             <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
//             <span className="text-sm font-medium">Events & Activities</span>
//           </div>
          
//           {/* Title with gradient effect */}
//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
//             <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
//               Events &
//             </span>{' '}
//             <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
//               Activities
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
//             Discover workshops, seminars, competitions, and exhibitions organized by AAC
//           </p>

//           {/* Decorative dots */}
//           <div className="flex justify-center items-center gap-3 mt-8">
//             <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
//             <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
//             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 pb-24">
//         {/* Filter Controls */}
//         <div className="mb-12">
//           <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Search */}
//               <div>
//                 <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
//                   Search Events
//                 </label>
//                 <input
//                   type="text"
//                   id="search"
//                   placeholder="Search by name or description..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all duration-200"
//                 />
//               </div>
              
//               {/* Category filter */}
//               <div>
//                 <label htmlFor="category" className="block text-sm font-medium text-gray-400 mb-3">
//                   Filter by Category
//                 </label>
//                 <select
//                   id="category"
//                   value={categoryFilter}
//                   onChange={(e) => setCategoryFilter(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
//                 >
//                   {categories.map(category => (
//                     <option key={category} value={category} className="bg-slate-800 text-white">
//                       {category}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               {/* Year filter */}
//               <div>
//                 <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-3">
//                   Filter by Year
//                 </label>
//                 <select
//                   id="year"
//                   value={yearFilter}
//                   onChange={(e) => setYearFilter(e.target.value)}
//                   className="w-full px-4 py-3 backdrop-blur-sm bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-200"
//                 >
//                   {years.map(year => (
//                     <option key={year} value={year} className="bg-slate-800 text-white">
//                       {year}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results Counter */}
//         <div className="mb-8">
//           <p className="text-lg text-gray-400">
//             Showing <span className="text-white font-medium">{sortedEvents.length}</span> of <span className="text-white font-medium">{eventsData.length}</span> events
//           </p>
//         </div>

//         {/* Events Grid or Empty State */}
//         {sortedEvents.length === 0 ? (
//           <div className="text-center py-20">
//             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
//               <span className="text-4xl">📅</span>
//             </div>
//             <h3 className="text-3xl font-bold text-white mb-4">
//               {eventsData.length === 0 ? 'No Events Yet' : 'No Events Found'}
//             </h3>
//             <p className="text-gray-400 text-lg">
//               {eventsData.length === 0 
//                 ? 'Events will be displayed here once they are added.' 
//                 : 'Try adjusting your search criteria to find more events.'}
//             </p>
//           </div>
//         ) : (
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={{
//               hidden: { opacity: 0 },
//               visible: {
//                 opacity: 1,
//                 transition: { 
//                   staggerChildren: 0.1,
//                   delayChildren: 0.3
//                 }
//               }
//             }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//           >
//             {sortedEvents.map((event, index) => (
//               <EventCard key={event.id} event={event} index={index} />
//             ))}
//           </motion.div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default EventsPage;
// src/pages/Events/index.js - Updated to use database
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import EventCard from '@/components/Events/EventCard';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';

const Events = () => {
  const { data: eventsData, loading, error } = useDatabase('events');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Process and filter events data
  useEffect(() => {
    if (!eventsData || !Array.isArray(eventsData)) {
      setFilteredEvents([]);
      return;
    }

    let processed = eventsData.filter(event => {
      // Basic filtering - ensure event has required fields
      if (!event.event && !event.title) return false;
      
      // Search filter
      const eventName = event.event || event.title || '';
      const eventDescription = event.description || '';
      const eventLocation = event.location || '';
      
      const matchesSearch = !searchTerm || 
        eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eventDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eventLocation.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status filter
      const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
      
      return matchesSearch && matchesStatus;
    });

    // Sort events
    processed.sort((a, b) => {
      // Try to use actualDate first, then fall back to date parsing
      let dateA, dateB;
      
      if (a.actualDate) {
        dateA = new Date(a.actualDate);
      } else if (a.date) {
        // Try to parse display date format
        dateA = new Date(a.date);
        if (isNaN(dateA.getTime())) {
          dateA = new Date(0); // fallback
        }
      } else {
        dateA = new Date(0);
      }
      
      if (b.actualDate) {
        dateB = new Date(b.actualDate);
      } else if (b.date) {
        dateB = new Date(b.date);
        if (isNaN(dateB.getTime())) {
          dateB = new Date(0);
        }
      } else {
        dateB = new Date(0);
      }
      
      return sortOrder === 'newest' 
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });

    setFilteredEvents(processed);
  }, [eventsData, searchTerm, selectedStatus, sortOrder]);

  // Get unique statuses for filter
  const statuses = ['All'];
  if (eventsData && Array.isArray(eventsData)) {
    const uniqueStatuses = [...new Set(eventsData.map(event => event.status).filter(Boolean))];
    statuses.push(...uniqueStatuses);
  }

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Our Events" 
          subtitle="Discover workshops, seminars, competitions, and exhibitions organized by AAC"
          tag="Events & Activities"
        />
        <ContentLoading text="Loading events..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Our Events" 
          subtitle="Discover workshops, seminars, competitions, and exhibitions organized by AAC"
          tag="Events & Activities"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading events: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHero 
        title="Our Events" 
        subtitle="Discover workshops, seminars, competitions, and exhibitions organized by AAC"
        tag="Events & Activities"
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status} className="bg-gray-800">
                    {status}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="newest" className="bg-gray-800">Newest First</option>
                <option value="oldest" className="bg-gray-800">Oldest First</option>
              </select>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-center">
            <span className="text-white text-sm">
              Showing {filteredEvents.length} of {eventsData?.length || 0} events
            </span>
          </div>
        </motion.div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-12 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                {eventsData?.length === 0 ? 'No Events Available' : 'No Results Found'}
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                {eventsData?.length === 0 
                  ? 'There are currently no events to display.'
                  : 'Try adjusting your search criteria or filters.'
                }
              </p>
              {(searchTerm || selectedStatus !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedStatus('All');
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
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
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id || event._id || index}
                event={event.event || event.title}
                date={event.date}
                path={event.path || `/Events/${event.id || event._id}`}
                img={event.img || event.mainImageUrl || '/images/pic.webp'}
                index={index}
              />
            ))}
          </motion.div>
        )}

        {/* Statistics Section */}
        {eventsData && eventsData.length > 0 && (
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
                  {eventsData.length}
                </div>
                <div className="text-gray-400">Total Events</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {eventsData.filter(e => e.status === 'completed').length}
                </div>
                <div className="text-gray-400">Completed</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {eventsData.filter(e => e.status === 'upcoming').length}
                </div>
                <div className="text-gray-400">Upcoming</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">
                  {eventsData.filter(e => e.status === 'ongoing').length}
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

export default Events;