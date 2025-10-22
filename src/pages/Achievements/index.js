// src/pages/Achievements/index.js - Final clean version
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import AchievementsCard from '@/components/Achievements/AchievementsCard';
import AchievementsFilter from '@/components/Achievements/AchievementsFilter';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useDatabase } from '@/hooks/useDatabase';

const AchievementsPage = () => {
  const { data: achievementsData, loading: isLoading, error } = useDatabase('achievements');
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Get all unique categories
  const categories = useMemo(() => {
    if (!achievementsData || !Array.isArray(achievementsData)) {
      return ['All'];
    }
    
    const uniqueCategories = [...new Set(
      achievementsData
        .filter(item => item && item.category)
        .map(item => item.category)
    )];
    
    return ['All', ...uniqueCategories.sort()];
  }, [achievementsData]);

  // Filter and sort achievements
  const filteredAchievements = useMemo(() => {
    if (!achievementsData || !Array.isArray(achievementsData)) {
      return [];
    }
    
    let filtered = achievementsData.filter(achievement => {
      if (!achievement) return false;
      if (!achievement.title && !achievement.description) return false;
      
      const title = achievement.title || '';
      const description = achievement.description || '';
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || achievement.category === activeCategory;
      
      const isPublished = !achievement.status || achievement.status === 'published' || achievement.status === 'Published';
      
      return matchesSearch && matchesCategory && isPublished;
    });

    // Sort by date
    filtered.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return filtered;
  }, [achievementsData, searchTerm, activeCategory, sortOrder]);

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-[#0e1421] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Error Loading Achievements</h2>
            <p className="text-gray-400">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#0e1421]">
        <PageHero
          title="Our Achievements"
          subtitle="Celebrating excellence, innovation, and outstanding accomplishments by our students and faculty members"
          tag="Achievements & Recognition"
          highlightTitle={true}
        />

        <div className="container mx-auto px-4 pb-24">
          {/* Filter Section */}
          <div className="mb-12">
            <AchievementsFilter
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <LoadingSpinner size="lg" text="Loading achievements..." />
            </div>
          )}

          {/* Achievements Grid - FIXED: Removed problematic motion and AnimatePresence */}
          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAchievements.length > 0 ? (
                filteredAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="h-full"
                  >
                    <AchievementsCard
                      achievements={achievement}
                      index={index}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <span className="text-4xl">🏆</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      No achievements found
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      {searchTerm || activeCategory !== 'All'
                        ? 'Try adjusting your search criteria or browse all categories.'
                        : 'No achievements have been published yet.'}
                    </p>
                    {(searchTerm || activeCategory !== 'All') && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setActiveCategory('All');
                        }}
                        className="mt-6 px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          {!isLoading && filteredAchievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-gray-400">
                Showing {filteredAchievements.length} achievement{filteredAchievements.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' && ` in ${activeCategory}`}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AchievementsPage;