// src/components/News/NewsFilter.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaSort, FaSortAmountDownAlt, FaSortAmountUp } from 'react-icons/fa';

const NewsFilter = ({ categories, activeCategory, setActiveCategory, searchTerm, setSearchTerm, sortOrder, setSortOrder }) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      {/* Main Controls */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search */}
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              />
            </div>
          </div>
          
          {/* Sort Order Toggle */}
          <div>
            <button
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="flex items-center gap-2 py-3 px-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              {sortOrder === 'newest' ? (
                <>
                  <FaSortAmountDownAlt className="text-gray-600" />
                  <span className="text-gray-700">Newest First</span>
                </>
              ) : (
                <>
                  <FaSortAmountUp className="text-gray-600" />
                  <span className="text-gray-700">Oldest First</span>
                </>
              )}
            </button>
          </div>
          
          {/* Filter Toggle */}
          <div>
            <button
              onClick={() => setIsFilterExpanded(!isFilterExpanded)}
              className="flex items-center gap-2 py-3 px-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
            >
              <FaFilter className="text-gray-600" />
              <span className="text-gray-700">Filter</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Expanded Filter Section */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isFilterExpanded ? 'auto' : 0,
          opacity: isFilterExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden border-t border-gray-100"
      >
        <div className="p-6 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Filter by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NewsFilter;