// ============= BOOKS PAGE =============
// src/pages/Books/index.js - Modern Premium UI Version
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { STORAGE_KEYS } from '@/lib/storage';

// Extract categories for filtering
function getCategories(booksData) {
  const uniqueCategories = ["All"];
  
  booksData.forEach(book => {
    if (!uniqueCategories.includes(book.category)) {
      uniqueCategories.push(book.category);
    }
  });
  
  return uniqueCategories;
}

function Books() {
  const { data: adminBooksData, loading } = useLocalStorage(STORAGE_KEYS.BOOKS);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Use admin data
  const booksData = adminBooksData;
  const categories = getCategories(booksData);
  const years = ["All", ...new Set(booksData.map(book => book.year).filter(Boolean))];
  
  // Filter books based on category, year, and search term
  const filteredBooks = booksData.filter(book => {
    const matchesCategory = categoryFilter === "All" || book.category === categoryFilter;
    const matchesYear = yearFilter === "All" || book.year === parseInt(yearFilter);
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesYear && matchesSearch;
  });
  
  function handleBookClick(id) {
    const book = booksData.find(b => b.id === id);
    setSelectedBook(book);
  }
  
  function handleCloseModal() {
    setSelectedBook(null);
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-16 h-16 border-4 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="text-xl text-gray-400">Loading books...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <Head>
        <title>Books & Blogs | AAC - Advanced Academic Center</title>
        <meta name="description" content="Books and blogs published by students and faculty of Advanced Academic Center at GRIET" />
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
            <span className="text-sm font-medium">Knowledge Sharing</span>
          </div>
          
          {/* Title with gradient effect */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Books &
            </span>{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Blogs
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100/90 max-w-4xl mx-auto leading-relaxed">
            Explore books and educational content created by our talented students and faculty
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
        {/* Filter controls */}
        <div className="mb-12">
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-3">
                  Search Books
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title or author..."
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
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mb-8">
          <p className="text-lg text-gray-400">
            Showing <span className="text-white font-medium">{filteredBooks.length}</span> of <span className="text-white font-medium">{booksData.length}</span> books
          </p>
        </div>
        
        {/* Books grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BookCard
                    book={book}
                    onClick={handleBookClick}
                  />
                </motion.div>
              ))}
            </div>
          ) : booksData.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
                <span className="text-4xl">📚</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No books available</h3>
              <p className="text-gray-400 text-lg">
                Add books through the admin panel to see them here.
              </p>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-8 shadow-lg">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">No books found</h3>
              <p className="text-gray-400 text-lg">
                Try adjusting your search filters
              </p>
              <button
                onClick={() => {
                  setCategoryFilter("All");
                  setYearFilter("All");
                  setSearchTerm("");
                }}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Clear filters
              </button>
            </div>
          )}
        </motion.div>
        
        {/* Student Authors Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24"
        >
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Title Section */}
            <div className="lg:w-1/3">
              <div className="text-center lg:text-left">
                {/* Animated gradient line */}
                <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mx-auto lg:mx-0 mb-8 rounded-full shadow-lg"></div>
                
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Student Authors
                  </span>
                </h2>
                
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                  We encourage students to share their knowledge through books and educational content.
                </p>
                
                {/* Decorative dots */}
                <div className="hidden lg:block mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-500"></div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse animation-delay-1000"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Grid */}
            <div className="lg:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Writing Support",
                    description: "Our student authors receive comprehensive support including writing workshops, editorial guidance, and publishing assistance to transform their knowledge into accessible, high-quality educational content.",
                    icon: "✏️",
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    title: "Publishing Opportunities", 
                    description: "We collaborate with publishers and digital platforms to ensure our students' work reaches a wide audience, helping them establish their credentials as thought leaders in their respective fields.",
                    icon: "📖",
                    color: "from-purple-500 to-purple-600"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="group relative backdrop-blur-sm bg-white/5 rounded-2xl p-6 shadow-xl border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                    
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Book Detail Modal */}
      <AnimatePresence>
        {selectedBook && (
          <BookDetail
            book={selectedBook}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}

// Book Card Component - Updated with modern UI (GRADIENTS UNCHANGED)
function BookCard({ book, onClick }) {
  // Gradient colors mapping (UNCHANGED)
  const gradientColors = {
    "blue": "from-blue-900 to-indigo-900",
    "indigo": "from-indigo-900 to-purple-900",
    "purple": "from-purple-900 to-indigo-900",
    "green": "from-blue-900 to-indigo-900",
    "orange": "from-indigo-900 to-blue-900",
  };
  
  // Get gradient class or default to blue if color not found (UNCHANGED)
  const gradientClass = gradientColors[book.color] || "from-blue-900 to-indigo-900";
  
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(book.id)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      
      <div className="relative" style={{paddingTop: "140%"}}>
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105 absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 bg-gradient-to-r ${gradientClass} text-white rounded-lg text-xs font-medium border border-white/30 backdrop-blur-sm`}>
              {book.category}
            </span>
            <span className="text-white text-xs">{book.year}</span>
          </div>
          <div className="mt-2">
            <button className="text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg text-sm hover:bg-white/30 transition-colors group-hover/btn:translate-x-1">
              View Details →
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col relative z-10">
        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
          {book.title}
        </h3>
        <p className="text-sm text-gray-400 mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
          By {book.authors[0].split(':')[0].trim()}
          {book.authors.length > 1 ? ` and ${book.authors.length - 1} more` : ''}
        </p>
        
        <div className="mt-auto pt-3">
          <div className={`w-full h-1 bg-gradient-to-r ${gradientClass} rounded-full`}></div>
        </div>
      </div>
    </motion.div>
  );
}

// Book Detail Modal Component - Updated with modern UI (GRADIENTS UNCHANGED)
function BookDetail({ book, onClose }) {
  // Gradient colors mapping (UNCHANGED)
  const gradientColors = {
    "blue": "from-blue-900 to-indigo-900",
    "indigo": "from-indigo-900 to-purple-900",
    "purple": "from-purple-900 to-indigo-900",
    "green": "from-blue-900 to-indigo-900",
    "orange": "from-indigo-900 to-blue-900",
  };
  
  // Get gradient class or default to blue if color not found (UNCHANGED)
  const gradientClass = gradientColors[book.color] || "from-blue-900 to-indigo-900";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-6xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          <div className={`md:w-1/3 bg-gradient-to-br ${gradientClass} p-8 relative flex items-center justify-center`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-200 md:hidden border border-white/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="relative w-full max-w-xs" style={{aspectRatio: "3/4"}}>
              {/* Book cover with 3D effect (UNCHANGED) */}
              <div className="w-full h-full backdrop-blur-sm bg-white/5 p-2 rounded-lg shadow-xl absolute border border-white/20" style={{transform: "rotate(3deg)"}}>
                <div className="h-full w-full overflow-hidden rounded-md relative">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full h-full backdrop-blur-sm bg-white/5 p-2 rounded-lg shadow-xl absolute border border-white/20" style={{transform: "rotate(-2deg)"}}>
                <div className="h-full w-full overflow-hidden rounded-md relative">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full h-full backdrop-blur-sm bg-white/5 p-2 rounded-lg shadow-xl relative border border-white/20">
                <div className="h-full w-full overflow-hidden rounded-md relative">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3 p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 backdrop-blur-sm bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-200 hidden md:block border border-white/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="mb-6">
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-1.5 w-24 mb-6 rounded-full shadow-lg"></div>
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1.5 bg-gradient-to-r ${gradientClass} text-white rounded-lg text-xs font-medium mr-3 border border-white/30`}>
                  {book.category}
                </span>
                <span className="text-gray-400 text-sm">Published in {book.year}</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{book.title}</h2>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Authors
              </h3>
              <div className="space-y-4">
                {book.authors.map((author, index) => {
                  const parts = author.split(': ');
                  const name = parts[0];
                  const bio = parts.length > 1 ? parts[1] : '';
                  
                  return (
                    <div key={index} className="backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10">
                      <h4 className="font-bold text-white mb-1">{name}</h4>
                      {bio && <p className="text-gray-300 text-sm">{bio}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                About the Book
              </h3>
              <div className="backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-white/10">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {book.description}
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className={`group/btn px-6 py-3 bg-gradient-to-r ${gradientClass} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden hover:scale-105`}>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Download Sample
                  <span className="group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Books