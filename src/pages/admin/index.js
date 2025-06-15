// src/pages/admin/index.js - Complete Updated Admin Dashboard
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/Layout";
import { STORAGE_KEYS, StorageManager } from "@/lib/storage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import PublicationsForm from "@/components/Forms/PublicationsForm";
import PatentsForm from "@/components/Forms/PatentsForm";
import BooksForm from "@/components/Forms/BooksForm";
import AlumniForm from "@/components/Forms/AlumniForm";
import StartupsForm from "@/components/Forms/StartupsForm";
import NewsForm from "@/components/Forms/NewsForm";

import EventsForm from "@/components/Forms/EventsForm";
import ProjectsForm from "@/components/Forms/ProjectsForm";

const ADMIN_SECTIONS = [
  { key: "news", label: "News", icon: "📰", storageKey: STORAGE_KEYS.NEWS },
  {
    key: "projects",
    label: "Projects",
    icon: "🚀",
    storageKey: STORAGE_KEYS.PROJECTS,
  },
  {
    key: "events",
    label: "Events",
    icon: "📅",
    storageKey: STORAGE_KEYS.EVENTS,
  },
  {
    key: "publications",
    label: "Publications",
    icon: "📄",
    storageKey: STORAGE_KEYS.PUBLICATIONS,
  },
  {
    key: "patents",
    label: "Patents",
    icon: "⚖️",
    storageKey: STORAGE_KEYS.PATENTS,
  },
  {
    key: "startups",
    label: "Startups",
    icon: "🏢",
    storageKey: STORAGE_KEYS.STARTUPS,
  },
  {
    key: "books",
    label: "Books & Blogs",
    icon: "📚",
    storageKey: STORAGE_KEYS.BOOKS,
  },
  {
    key: "alumni",
    label: "Alumni",
    icon: "🎓",
    storageKey: STORAGE_KEYS.ALUMNI,
  },
];

// Simple Migration Component
const SimpleMigrationComponent = () => {
  const [stats, setStats] = useState(null);
  const [migrating, setMigrating] = useState(false);

  const handleMigration = async () => {
    setMigrating(true);
    try {
      // Add sample data for testing based on schema
      const sampleData = {
        [STORAGE_KEYS.NEWS]: [
          {
            id: "sample-news-1",
            title: "AAC Students Win National Hackathon",
            slug: "AAC team secures first place at the prestigious coding competition.",
            content:
              "The Advanced Academic Center team has achieved remarkable success at the National Hackathon 2024...",
            publishedAt: new Date().toISOString(),
            categories: "ACHIEVEMENT",
            status: "published",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        [STORAGE_KEYS.PATENTS]: [
          {
            id: "automated-pill-reminder",
            title:
              "An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two way confirmation along with replaceable pill compartments layer as value addition been facilitated to the changing requirements.",
            shortTitle: "Automated Pill Reminder Device",
            inventors: [
              "Yelma Chethan Reddy",
              "Alence Abhinay",
              "B.S.V.S Anoop",
            ],
            patentOffice: "India",
            applicationNumber: "201941002559",
            date: new Date("2019-01-21").toISOString(),
            status: "Published Online",
            description:
              "This patent is for an innovative device designed to help patients remember to take their medications on schedule...",
            category: "Healthcare",
            color: "purple",
            image: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        [STORAGE_KEYS.PUBLICATIONS]: [
          {
            id: "sample-publication-1",
            title:
              "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
            abstract:
              "This paper proposes a novel ensemble learning method for accurately predicting wine quality...",
            authors: [
              "Dodda Abhiram",
              "Siddharth Mahesh Balijepally",
              "Ekantha Sai Sundar",
            ],
            publication:
              "International Journal of Engineering Research and Technology(IJERT), ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
            category: "Machine Learning",
            publishedAt: new Date("2024-08-01").toISOString(),
            image: "",
            downloadUrl: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      };

      Object.entries(sampleData).forEach(([key, data]) => {
        const existing = StorageManager.get(key);
        const combined = [...existing, ...data];
        StorageManager.set(key, combined);
      });

      setStats({ migrated: true, timestamp: new Date().toISOString() });
      alert("Sample data added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Migration error:", error);
      alert("Migration failed. Check console for details.");
    } finally {
      setMigrating(false);
    }
  };

  const handleClearData = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      StorageManager.clearAll();
      alert("All data cleared successfully!");
      window.location.reload();
    }
  };

  useEffect(() => {
    const currentStats = {};
    Object.values(STORAGE_KEYS).forEach((key) => {
      const data = StorageManager.get(key);
      currentStats[key] = data.length;
    });
    setStats(currentStats);
  }, []);

  return (
    <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-white">
        Data Migration Utility
      </h3>

      <div className="space-y-4 mb-6">
        <button
          onClick={handleMigration}
          disabled={migrating}
          className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 border border-blue-700"
        >
          {migrating ? "Adding Sample Data..." : "Add Sample Data"}
        </button>

        <button
          onClick={handleClearData}
          disabled={migrating}
          className="px-4 py-2 bg-red-900 text-red-300 rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 border border-red-700 ml-4"
        >
          Clear All Data
        </button>
      </div>

      {stats && (
        <div className="bg-[#0e1421] rounded-lg p-4 border border-gray-700">
          <h4 className="font-semibold mb-3 text-white">Current Data Stats:</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {Object.entries(stats).map(([key, count]) => (
              <div key={key} className="text-gray-300">
                <span className="font-medium">{key}:</span>{" "}
                {typeof count === "number" ? `${count} items` : count}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("alumni");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showImportExport, setShowImportExport] = useState(false);
  const [showMigration, setShowMigration] = useState(false);

  const currentSection = ADMIN_SECTIONS.find((s) => s.key === activeSection);
  const { data, loading, deleteItem, refresh } = useLocalStorage(
    currentSection?.storageKey
  );

  const handleAdd = () => {
    console.log("Adding new item for section:", activeSection);
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    console.log("Editing item:", id);
    setEditingId(id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log("Deleting item:", id);
      const success = deleteItem(id);
      if (success) {
        console.log("Item deleted successfully");
        refresh();
      } else {
        console.error("Failed to delete item");
      }
    }
  };

  const handleFormSuccess = (result) => {
    console.log("Form submitted successfully:", result);
    setShowForm(false);
    setEditingId(null);
    refresh();
    alert("Item saved successfully!");
  };

  const handleFormCancel = () => {
    console.log("Form cancelled");
    setShowForm(false);
    setEditingId(null);
  };

  const toggleImportExport = () => {
    setShowImportExport(!showImportExport);
    setShowMigration(false);
  };

  const toggleMigration = () => {
    setShowMigration(!showMigration);
    setShowImportExport(false);
  };

  const handleExport = () => {
    try {
      const exportData = StorageManager.exportData();
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `aac-data-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert("Data exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Check console for details.");
    }
  };

  // src/pages/admin/index.js - Update the handleImport function (around line 267)

const handleImport = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        console.log('Raw import data:', importData);
        
        // Handle different JSON formats
        let processedData = {};
        
        if (Array.isArray(importData)) {
          // If it's an array, we need to process it based on the content
          console.log('Detected array format');
          
          // Check if it looks like news data (has _id, title, etc.)
          if (importData.length > 0 && importData[0]._id && importData[0].title) {
            console.log('Detected news data format');
            
            // Transform the data to match our storage format
            const transformedNews = importData.map(item => ({
              id: item._id, // Map _id to id
              _id: item._id, // Keep _id for compatibility
              title: item.title,
              slug: typeof item.slug === 'object' ? item.slug.current : item.slug, // Handle slug object
              publishedAt: item.publishedAt,
              categories: item.categories,
              _rawBody: item._rawBody,
              mainImage: item.mainImage,
              links: item.links || [],
              _type: item._type,
              _createdAt: item._createdAt,
              _updatedAt: item._updatedAt,
              _rev: item._rev,
              createdAt: item._createdAt || new Date().toISOString(),
              updatedAt: item._updatedAt || new Date().toISOString()
            }));
            
            processedData[STORAGE_KEYS.NEWS] = transformedNews;
          } else {
            // Assume it's for the current active section
            processedData[currentSection?.storageKey] = importData;
          }
        } else if (typeof importData === 'object') {
          // If it's an object, check if it has storage keys or alternative keys
          if (Object.keys(importData).some(key => Object.values(STORAGE_KEYS).includes(key))) {
            // Direct storage format
            processedData = importData;
          } else {
            // Check for alternative keys and map them
            const keyMappings = {
              'aac_books': STORAGE_KEYS.BOOKS,
              'aac_alumni': STORAGE_KEYS.ALUMNI,
              'aac_startups': STORAGE_KEYS.STARTUPS,
              'aac_news': STORAGE_KEYS.NEWS,
              'aac_patents': STORAGE_KEYS.PATENTS,
              'aac_publications': STORAGE_KEYS.PUBLICATIONS,
              'aac_projects': STORAGE_KEYS.PROJECTS,
              'aac_events': STORAGE_KEYS.EVENTS
            };
            
            Object.entries(importData).forEach(([key, value]) => {
              const mappedKey = keyMappings[key];
              if (mappedKey) {
                processedData[mappedKey] = value;
              }
            });
            
            // If no mappings found, try to detect what type of data it is
            if (Object.keys(processedData).length === 0) {
              const firstKey = Object.keys(importData)[0];
              const firstValue = importData[firstKey];
              
              if (Array.isArray(firstValue)) {
                // It's probably a data export format with unknown keys
                processedData = importData;
              } else if (importData.hasOwnProperty('title') || importData.hasOwnProperty('name') || importData.hasOwnProperty('Name')) {
                // It's a single item object, add to current section
                processedData[currentSection?.storageKey] = [importData];
              }
            }
          }
        }
        
        console.log('Processed data:', processedData);
        
        if (Object.keys(processedData).length === 0) {
          throw new Error('No valid data found in the JSON file');
        }
        
        // Import the processed data
        Object.entries(processedData).forEach(([key, data]) => {
          const existing = StorageManager.get(key);
          let combined;
          
          if (key === STORAGE_KEYS.NEWS && Array.isArray(data)) {
            // Special handling for news data to avoid duplicates
            const existingIds = new Set(existing.map(item => item.id || item._id));
            const newItems = data.filter(item => !existingIds.has(item.id || item._id));
            combined = [...existing, ...newItems];
          } else {
            combined = [...existing, ...(Array.isArray(data) ? data : [data])];
          }
          
          StorageManager.set(key, combined);
        });
        
        refresh();
        alert(`Data imported successfully! Imported ${Object.values(processedData).flat().length} items.`);
        window.location.reload();
      } catch (error) {
        console.error("Import failed:", error);
        alert("Import failed: " + error.message);
      }
    };
    reader.readAsText(file);
  }
  event.target.value = "";
};

  const renderForm = () => {
    switch (activeSection) {
      case "news":
        return (
        <NewsForm
          newsId={editingId}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      );
      case "patents":
        return (
          <PatentsForm
            patentId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case "publications":
        return (
          <PublicationsForm
            publicationId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case "books":
        return (
          <BooksForm
            bookId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case "alumni":
        return (
          <AlumniForm
            alumnusId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case "startups":
        return (
          <StartupsForm
            startupId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case "events":
        return (
          <EventsForm
            eventId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      case "projects":
        return (
          <ProjectsForm
            projectId={editingId}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
          />
        );
      default:
        return (
          <div className="bg-[#1a2535] rounded-xl p-8 border border-gray-700">
            <p className="text-gray-300">
              Form for {activeSection} coming soon...
            </p>
            <button
              onClick={handleFormCancel}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        );
    }
  };

  const renderItemList = () => {
    if (loading) {
      return <div className="text-center py-8 text-gray-400">Loading...</div>;
    }

    if (data.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No {activeSection} yet
          </h3>
          <p className="text-gray-400 mb-6">
            Create your first {activeSection.slice(0, -1)} to get started.
          </p>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
          >
            Add {activeSection.slice(0, -1)}
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {data.map((item) => (
          <motion.div
            key={item.id || item.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a2535] rounded-lg p-6 border border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title || item.shortTitle || item.name || item.Name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.categories && (
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded border border-blue-700/50">
                      {item.categories}
                    </span>
                  )}
                  {item.category && (
                    <span className="px-2 py-1 bg-blue-900/50 text-blue-300 text-xs rounded border border-blue-700/50">
                      {item.category}
                    </span>
                  )}
                  
                  {/* Alumni specific badges */}
                  {item.Designation && (
                    <span className="px-2 py-1 bg-green-900/50 text-green-300 text-xs rounded border border-green-700/50">
                      {item.Designation}
                    </span>
                  )}
                  {item.Company && (
                    <span className="px-2 py-1 bg-purple-900/50 text-purple-300 text-xs rounded border border-purple-700/50">
                      {item.Company}
                    </span>
                  )}
                  {item.graduationYear && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded">
                      Class of {item.graduationYear}
                    </span>
                  )}
                  
                  {item.color && (
                    <span
                      className={`px-2 py-1 text-xs rounded border ${
                        item.color === "purple"
                          ? "bg-purple-900/50 text-purple-300 border-purple-700/50"
                          : item.color === "blue"
                          ? "bg-blue-900/50 text-blue-300 border-blue-700/50"
                          : item.color === "green"
                          ? "bg-green-900/50 text-green-300 border-green-700/50"
                          : "bg-gray-900/50 text-gray-300 border-gray-700/50"
                      }`}
                    >
                      {item.color}
                    </span>
                  )}
                  {item.status && (
                    <span
                      className={`px-2 py-1 text-xs rounded border ${
                        item.status === "published" ||
                        item.status === "Published Online" ||
                        item.status === "Granted" ||
                        item.status === "Active"
                          ? "bg-green-900/50 text-green-300 border-green-700/50"
                          : "bg-yellow-900/50 text-yellow-300 border-yellow-700/50"
                      }`}
                    >
                      {item.status}
                    </span>
                  )}
                  {(item.publishedAt || item.date || item.establishedDate) && (
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded">
                      {new Date(
                        item.publishedAt || item.date || item.establishedDate
                      ).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Display relevant information based on section */}
                {item.abstract && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {item.abstract}
                  </p>
                )}
                {item.description && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {item.description}
                  </p>
                )}
                {item.mission && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    <strong>Mission:</strong> {item.mission}
                  </p>
                )}
                {item.bio && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {item.bio}
                  </p>
                )}
                {item.slug && typeof item.slug === "string" && (
                  <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                    {item.slug}
                  </p>
                )}
                {item.author && (
                  <p className="text-gray-400 text-sm">Author: {item.author}</p>
                )}
                {item.inventors && Array.isArray(item.inventors) && (
                  <p className="text-gray-400 text-sm">
                    Inventors: {item.inventors.slice(0, 3).join(", ")}
                    {item.inventors.length > 3
                      ? ` +${item.inventors.length - 3} more`
                      : ""}
                  </p>
                )}
                {item.authors && Array.isArray(item.authors) && (
                  <p className="text-gray-400 text-sm">
                    Authors: {item.authors.join(", ")}
                  </p>
                )}
                {item.founders && Array.isArray(item.founders) && (
                  <p className="text-gray-400 text-sm">
                    Founders: {item.founders.join(", ")}
                  </p>
                )}
                {item.applicationNumber && (
                  <p className="text-gray-400 text-sm">
                    App No: {item.applicationNumber}
                  </p>
                )}
                {item.patentOffice && (
                  <p className="text-gray-400 text-sm">
                    Patent Office: {item.patentOffice}
                  </p>
                )}
                {item.publication && (
                  <p className="text-gray-400 text-sm line-clamp-1">
                    Publication: {item.publication}
                  </p>
                )}
                {item.department && (
                  <p className="text-gray-400 text-sm">
                    Department: {item.department}
                  </p>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(item.id || item.Id)}
                  className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded hover:bg-blue-800/50 transition-colors border border-blue-700/50"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id || item.Id)}
                  className="px-3 py-1 bg-red-900/50 text-red-300 rounded hover:bg-red-800/50 transition-colors border border-red-700/50"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard | AAC</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-[#0e1421] py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            {/* Header with Fixed Button Layout */}
            <div className="bg-[#1a2535] rounded-xl p-6 mb-6 border border-gray-700">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      Content Management
                    </h1>
                    <p className="text-gray-400">
                      Manage your AAC website content
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                    <button
                      onClick={toggleImportExport}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors text-center font-medium"
                    >
                      {showImportExport
                        ? "✖️ Close Import/Export"
                        : "📁 Import/Export"}
                    </button>
                    <button
                      onClick={toggleMigration}
                      className="w-full sm:w-auto px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-600 transition-colors text-center font-medium"
                    >
                      {showMigration
                        ? "✖️ Close Migration"
                        : "🔄 Data Migration"}
                    </button>
                  </div>
                </div>

                {/* Import/Export Section */}
                {showImportExport && (
                  <div className="mt-6 pt-6 border-t border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      📁 Data Import/Export
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#0e1421] p-4 rounded-lg border border-gray-600">
                        <h4 className="text-white font-medium mb-2">
                          📤 Export Data
                        </h4>
                        <p className="text-gray-400 text-sm mb-3">
                          Download all content as JSON
                        </p>
                        <button
                          onClick={handleExport}
                          className="w-full px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
                        >
                          Download Backup
                        </button>
                      </div>

                      <div className="bg-[#0e1421] p-4 rounded-lg border border-gray-600">
                        <h4 className="text-white font-medium mb-2">
                          📥 Import Data
                        </h4>
                        <p className="text-gray-400 text-sm mb-3">
                          Upload JSON file to restore
                        </p>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".json"
                            onChange={handleImport}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          />
                          <button className="w-full px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700 relative z-0">
                            Select JSON File
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Migration Section */}
                {showMigration && (
                  <div className="mt-6 pt-6 border-t border-gray-600">
                    <SimpleMigrationComponent />
                  </div>
                )}
              </div>
            </div>

            {/* Section Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {ADMIN_SECTIONS.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`p-3 rounded-lg text-center transition-colors ${
                    activeSection === section.key
                      ? "bg-blue-900 text-blue-300 border border-blue-700"
                      : "bg-[#1a2535] text-gray-300 hover:bg-[#243447] border border-gray-700"
                  }`}
                >
                  <div className="text-2xl mb-1">{section.icon}</div>
                  <div className="text-xs font-medium">{section.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderForm()}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#1a2535] rounded-xl shadow-xl border border-gray-700">
                  <div className="flex justify-between items-center p-6 border-b border-gray-700">
                    <h2 className="text-xl font-semibold text-white">
                      {currentSection?.label} ({data.length})
                    </h2>
                    <button
                      onClick={handleAdd}
                      className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
                    >
                      Add {currentSection?.label.slice(0, -1)}
                    </button>
                  </div>
                  <div className="p-6">{renderItemList()}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard