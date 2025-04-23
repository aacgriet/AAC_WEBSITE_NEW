// src/pages/Books/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import booksData from '@/components/Data/booksData';

// Extract categories for filtering
function getCategories() {
  const uniqueCategories = ["All"];
  
  booksData.forEach(book => {
    if (!uniqueCategories.includes(book.category)) {
      uniqueCategories.push(book.category);
    }
  });
  
  return uniqueCategories;
}

function Books() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  
  const categories = getCategories();
  
  // Filter books based on category and search term
  const filteredBooks = booksData.filter(book => {
    const matchesCategory = categoryFilter === "All" || book.category === categoryFilter;
    
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });
  
  function handleBookClick(id) {
    const book = booksData.find(b => b.id === id);
    setSelectedBook(book);
  }
  
  function handleCloseModal() {
    setSelectedBook(null);
  }
  
  return (
    <Layout>
      <Head>
        <title>Books & Blogs | AAC - Advanced Academic Center</title>
        <meta name="description" content="Books and blogs published by students and faculty of Advanced Academic Center at GRIET" />
      </Head>
      
      <PageHero 
        title="Books & Blogs" 
        subtitle="Explore books and educational content created by our talented students and faculty"
        tag="Knowledge Sharing"
      />
      
      <div className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {/* Filter and search section */}
          <div className="mb-12">
            <div className="bg-[#1a2535] rounded-xl shadow-md p-6 border border-gray-700">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Category filter */}
                <div className="w-full md:w-1/2">
                  <label htmlFor="category-filter" className="block text-sm font-medium text-gray-300 mb-2">
                    Filter by Category
                  </label>
                  <div className="relative">
                    <select
                      id="category-filter"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="block w-full py-2.5 px-4 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-[#0e1421] text-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Search input */}
                <div className="w-full md:w-1/2">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="search"
                      placeholder="Search by title or author..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#0e1421] text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Books grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onClick={handleBookClick}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#1a2535] rounded-xl shadow-md p-12 text-center border border-gray-700">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                <h3 className="mt-4 text-xl font-medium text-white">No books found</h3>
                <p className="mt-2 text-gray-400">
                  Try adjusting your filters or search criteria.
                </p>
                <button
                  onClick={() => {
                    setCategoryFilter("All");
                    setSearchTerm("");
                  }}
                  className="mt-6 inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 border border-blue-700/50"
                >
                  Clear filters
                </button>
              </div>
            )}
          </motion.div>
          
          {/* Reading Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">Student Authors</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                We encourage students to share their knowledge through books and educational content.
              </p>
            </div>
            
            <div className="bg-[#1a2535] rounded-xl overflow-hidden shadow-xl border border-gray-700">
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-1"></div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-[#0e1421] p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                      <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                      Writing Support
                    </h3>
                    <p className="text-gray-300">
                      Our student authors receive comprehensive support including writing workshops, editorial guidance, and publishing assistance to transform their knowledge into accessible, high-quality educational content.
                    </p>
                  </div>
                  <div className="bg-[#0e1421] p-6 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 flex items-center text-white">
                      <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      Publishing Opportunities
                    </h3>
                    <p className="text-gray-300">
                      We collaborate with publishers and digital platforms to ensure our students' work reaches a wide audience, helping them establish their credentials as thought leaders in their respective fields.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl px-6 py-12 shadow-xl border border-blue-700/50">
              <h2 className="text-3xl font-bold mb-4">Have Knowledge to Share?</h2>
              <p className="max-w-2xl mx-auto mb-8 text-blue-100">
                If you're passionate about a technical subject and want to share your expertise, we can help you transform your knowledge into a published book or blog.
              </p>
              <button className="px-8 py-3 bg-[#0e1421] text-white rounded-full font-medium hover:bg-[#15202d] transition-colors border border-blue-700/30">
                Start Your Writing Journey
              </button>
            </div>
          </motion.div>
        </div>
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

// Book Card Component
function BookCard({ book, onClick }) {
  // Gradient colors mapping
  const gradientColors = {
    "blue": "from-blue-900 to-indigo-900",
    "indigo": "from-indigo-900 to-purple-900",
    "purple": "from-purple-900 to-indigo-900",
    "green": "from-blue-900 to-indigo-900",
    "orange": "from-indigo-900 to-blue-900",
  };
  
  // Get gradient class or default to blue if color not found
  const gradientClass = gradientColors[book.color] || "from-blue-900 to-indigo-900";
  
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden h-full flex flex-col border border-gray-700"
      onClick={() => onClick(book.id)}
    >
      <div className="relative" style={{paddingTop: "133%"}}>
        <Image
          src={book.cover}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105 absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center space-x-2">
            <span className={`inline-block px-2 py-1 text-xs font-medium text-blue-300 bg-gradient-to-r ${gradientClass} rounded-full border border-blue-700/50`}>
              {book.category}
            </span>
            <span className="text-white text-xs">{book.year}</span>
          </div>
          <div className="mt-2">
            <button className="text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm hover:bg-white/30 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-2 text-white">{book.title}</h3>
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          By {book.authors[0].split(':')[0].trim()}
          {book.authors.length > 1 ? ` and ${book.authors.length - 1} more` : ''}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className={`w-full h-1 bg-gradient-to-r ${gradientClass} rounded-full`}></div>
        </div>
      </div>
    </motion.div>
  );
}

// Book Detail Modal Component
function BookDetail({ book, onClose }) {
  // Gradient colors mapping
  const gradientColors = {
    "blue": "from-blue-900 to-indigo-900",
    "indigo": "from-indigo-900 to-purple-900",
    "purple": "from-purple-900 to-indigo-900",
    "green": "from-blue-900 to-indigo-900",
    "orange": "from-indigo-900 to-blue-900",
  };
  
  // Get gradient class or default to blue if color not found
  const gradientClass = gradientColors[book.color] || "from-blue-900 to-indigo-900";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1a2535] rounded-xl shadow-2xl overflow-hidden max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col md:flex-row">
          <div className={`md:w-1/3 bg-gradient-to-br ${gradientClass} p-8 relative flex items-center justify-center`}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-colors md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="relative w-full max-w-xs" style={{aspectRatio: "3/4"}}>
              {/* Book cover with 3D effect */}
              <div className="w-full h-full bg-[#0e1421] p-2 rounded-lg shadow-xl absolute border border-gray-700" style={{transform: "rotate(3deg)"}}>
                <div className="h-full w-full overflow-hidden rounded-md relative">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full h-full bg-[#0e1421] p-2 rounded-lg shadow-xl absolute border border-gray-700" style={{transform: "rotate(-2deg)"}}>
                <div className="h-full w-full overflow-hidden rounded-md relative">
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full h-full bg-[#0e1421] p-2 rounded-lg shadow-xl relative border border-gray-700">
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
              className="absolute top-4 right-4 bg-[#0e1421] hover:bg-[#15202d] text-white rounded-full p-2 transition-colors hidden md:block border border-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <span className={`inline-block px-3 py-1 text-xs font-medium text-blue-300 bg-gradient-to-r ${gradientClass} rounded-full mr-2 border border-blue-700/50`}>
                  {book.category}
                </span>
                <span className="text-gray-400 text-sm">Published in {book.year}</span>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-white">{book.title}</h2>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
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
                    <div key={index} className="bg-[#0e1421] p-4 rounded-lg border border-gray-700">
                      <h4 className="font-bold text-white mb-1">{name}</h4>
                      {bio && <p className="text-gray-300 text-sm">{bio}</p>}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                About the Book
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {book.description}
              </p>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button className="py-2 px-6 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-full hover:from-blue-800 hover:to-indigo-800 transition-colors border border-blue-700/50">
                Download Sample
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Books;