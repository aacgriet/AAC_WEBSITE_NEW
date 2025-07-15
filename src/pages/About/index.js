import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';
import { useDatabase } from '@/hooks/useDatabase';
import { ContentLoading } from '@/components/LoadingSpinner';

// Simplified Alumni Card Component (inline for easier modification)

const AboutAAC = () => {
  const { data: alumniData, loading, error } = useDatabase('alumni');
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Filter alumni based on search and filters
  useEffect(() => {
    let filtered = [...alumniData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(alumni =>
        (alumni.Name || alumni.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (alumni.Designation || alumni.designation || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Department filter
    if (selectedDepartment) {
      filtered = filtered.filter(alumni =>
        (alumni.department || alumni.Department) === selectedDepartment
      );
    }

    // Year filter
    if (selectedYear) {
      filtered = filtered.filter(alumni =>
        (alumni.graduationYear || alumni.year) === parseInt(selectedYear)
      );
    }

    setFilteredAlumni(filtered);
  }, [alumniData, searchTerm, selectedDepartment, selectedYear]);

  // Get unique departments and years for filters
  const departments = [...new Set(alumniData.map(alumni => alumni.department || alumni.Department).filter(Boolean))];
  const years = [...new Set(alumniData.map(alumni => alumni.graduationYear || alumni.year).filter(Boolean))].sort((a, b) => b - a);

  if (loading) {
    return (
      <Layout>
        <PageHero 
          title="Alumni Network"
          subtitle="Connect with our accomplished graduates making their mark worldwide"
          tag="Alumni Directory"
        />
        <ContentLoading text="Loading alumni data..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <PageHero 
          title="Alumni Network"
          subtitle="Connect with our accomplished graduates making their mark worldwide"
          tag="Alumni Directory"
        />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-red-400 text-lg">Error loading alumni data: {error}</div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>Alumni Network | Advanced Academic Center</title>
        <meta 
          name="description" 
          content="Connect with our accomplished alumni network. Discover graduates who are making their mark in various industries worldwide."
        />
      </Head>

      <Layout>
        <PageHero 
          title="Alumni Network"
          subtitle="Connect with our accomplished graduates making their mark worldwide"
          tag="Alumni Directory"
        />

        <div className="container mx-auto px-4 py-16">
          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <input
                  type="text"
                  placeholder="Search alumni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Department Filter */}
              <div>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="bg-slate-800">
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year} className="bg-slate-800">
                      Class of {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results count */}
            <div className="mt-4 text-gray-400 text-sm">
              Showing {filteredAlumni.length} of {alumniData.length} alumni
            </div>
          </motion.div>

          {/* Alumni Grid */}
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {filteredAlumni.map((alumni, index) => (
              <SimplifiedAlumniCard
                key={alumni.Id || alumni.id || index}
                alumni={alumni}
                index={index}
              />
            ))}
          </motion.div>

          {/* No results message */}
          {filteredAlumni.length === 0 && alumniData.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 text-lg mb-4">No alumni found matching your criteria</div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedDepartment('');
                  setSelectedYear('');
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* Empty state */}
          {alumniData.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-lg">No alumni data available</div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default AboutAAC;