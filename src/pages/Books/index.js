

// src/pages/Books/index.js - Updated to use database
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import LoadingSpinner, { ContentLoading } from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';

const BookCard = ({ book, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get color classes
  const getColorClasses = (color) => {
    const colorMap = {
      'blue': 'from-blue-500 to-blue-600',
      'indigo': 'from-indigo-500 to-indigo-600', 
      'purple': 'from-purple-500 to-purple-600',
      'green': 'from-green-500 to-green-600',
      'orange': 'from-orange-500 to-orange-600'
    };
    return colorMap[color] || 'from-blue-500 to-blue-600';
  };

  const colorClasses = getColorClasses(book.color);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        whileHover={{ y: -8, scale: 1.03 }}
        className="group relative backdrop-blur-sm bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.replace('to-', 'to-').replace('from-', 'from-')}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
        
        <div className="p-6 relative z-10">
          {/* Book Cover */}
          {book.cover && (
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-40 rounded-lg overflow-hidden shadow-lg border border-white/20">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          )}
          
          {/* Category Badge */}
          <div className="mb-4 flex justify-center">
            <span className={`px-3 py-1 bg-gradient-to-r ${colorClasses}/20 text-${colorClasses.split('-')[1]}-300 rounded-lg text-xs font-medium border border-${colorClasses.split('-')[1]}-500/30`}>
              {book.category}
            </span>
          </div>
          
          <h3 className="text-lg font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 line-clamp-2 text-center">
            {book.title}
          </h3>
          
          {/* Authors */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm text-center">
              {Array.isArray(book.authors) ? book.authors.length : 1} author{Array.isArray(book.authors) && book.authors.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          {/* Year */}
          <div className="mb-4 text-center">
            <span className="text-gray-400 text-sm">Published {book.year}</span>
          </div>
          
          {/* Description Preview */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
            {book.description}
          </p>
          
          {/* Read more indicator */}
          <div className="mt-auto pt-4 border-t border-white/10 group-hover:border-white/20 transition-colors duration-300">
            <div className="flex items-center justify-between">
              <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                Click to read more
              </span>
              <div className={`bg-gradient-to-r ${colorClasses} h-1 w-8 rounded-full shadow-lg group-hover:w-12 transition-all duration-300`}></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="backdrop-blur-md bg-white/5 rounded-2xl shadow-2xl border border-white/20 overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-gradient-to-r ${colorClasses} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                  <p className="text-white/90 mb-2">{book.category} • {book.year}</p>
                  <p className="text-white/80 text-sm">
                    {Array.isArray(book.authors) ? book.authors.length : 1} author{Array.isArray(book.authors) && book.authors.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Book Cover */}
                {book.cover && (
                  <div className="md:col-span-1">
                    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg border border-white/20">
                      <Image
                        src={book.cover}
                        alt={book.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                
                {/* Book Info */}
                <div className={`${book.cover ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">About This Book</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {book.description}
                  </p>
                  
                  {/* Book Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Publication Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{book.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Year:</span>
                          <span className="text-white">{book.year}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Status:</span>
                          <span className="text-green-400">Published</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                      <h4 className="text-white font-semibold mb-2">Author Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Authors:</span>
                          <span className="text-white">{Array.isArray(book.authors) ? book.authors.length : 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Authors Section */}
              {Array.isArray(book.authors) && book.authors.length > 0 && (
                <div className="mt-8">
                  <div className={`bg-gradient-to-r ${colorClasses} h-1.5 w-24 mb-4 rounded-full shadow-lg`}></div>
                  <h3 className="text-xl font-bold text-white mb-4">Authors</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {book.authors.map((author, index) => (
                      <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4">
                        <p className="text-gray-300 leading-relaxed">{author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const Books = () => {
  const { data: booksData, loading, error } = useDatabase('books');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

  // Filter books based on search and filters
  useEffect(() => {
    if (!booksData) return;
    
    let filtered = booksData.filter(book => {
      const matchesSearch = 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(book.authors) && book.authors.some(author => 
          author.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesYear = selectedYear === 'All' || book.year.toString() === selectedYear;
      
      return matchesSearch && matchesCategory && matchesYear;
    });
    
    setFilteredBooks(filtered);
  }, [booksData, searchTerm, selectedCategory, selectedYear]);

  // Get unique categories and years for filters
  const categories = ['All', ...new Set(booksData?.map(book => book.category).filter(Boolean) || [])];
  const years = ['All', ...new Set(booksData?.map(book => book.year).filter(Boolean).sort((a, b) => b - a) || [])];

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Books & Blogs" 
          subtitle="Explore our collection of published books and educational content"
          tag="Publications"
        />
        <ContentLoading text="Loading books data..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Books & Blogs" 
          subtitle="Explore our collection of published books and educational content"
          tag="Publications"
        />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-400 text-lg">Error loading books data: {error}</p>
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
        title="Books & Blogs" 
        subtitle="Explore our collection of published books and educational content"
        tag="Publications"
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
            <div>
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-gray-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                {years.map(year => (
                  <option key={year} value={year} className="bg-gray-800">
                    {year === 'All' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="text-center">
              <span className="text-white text-sm">
                Showing {filteredBooks.length} of {booksData?.length || 0} books
              </span>
            </div>
          </div>
        </motion.div>

        {/* Books Grid */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {booksData?.length === 0 ? 'No books available.' : 'No books match your search criteria.'}
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
                  delayChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredBooks.map((book, index) => (
              <BookCard
                key={book.id || book._id || index}
                book={book}
                index={index}
              />
            ))}
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default Books;