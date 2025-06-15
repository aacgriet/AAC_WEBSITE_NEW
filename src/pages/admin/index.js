// src/pages/admin/index.js - COMPLETE FIXED IMPLEMENTATION
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

// Simple Migration Component with proper error handling
const SimpleMigrationComponent = () => {
  const [stats, setStats] = useState(null);
  const [migrating, setMigrating] = useState(false);
  const [error, setError] = useState(null);

  const handleMigration = async () => {
    setMigrating(true);
    setError(null);
    
    try {
      // Add sample data for testing based on schema
      const sampleData = {
        [STORAGE_KEYS.NEWS]: [
          {
            id: "sample-news-1",
            title: "AAC Students Win National Hackathon",
            slug: "AAC team secures first place at the prestigious coding competition.",
            content: "The Advanced Academic Center team has achieved remarkable success at the National Hackathon 2024...",
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
            title: "An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two way confirmation along with replaceable pill compartments layer as value addition been facilitated to the changing requirements.",
            shortTitle: "Automated Pill Reminder Device",
            inventors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop"],
            patentOffice: "India",
            applicationNumber: "201941002559",
            date: new Date("2019-01-21").toISOString(),
            status: "Published Online",
            description: "This patent is for an innovative device designed to help patients remember to take their medications on schedule...",
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
            title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
            abstract: "This paper proposes a novel ensemble learning method for accurately predicting wine quality...",
            authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
            publication: "International Journal of Engineering Research and Technology(IJERT), ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
            category: "Machine Learning",
            year: 2024,
            publishedAt: new Date("2024-08-01").toISOString(),
            image: "",
            downloadUrl: "", 
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        [STORAGE_KEYS.BOOKS]: [
          {
            id: "sample-book-1",
            title: "FUNDAMENTALS OF PYTHON IN A NUTSHELL",
            description: "This book, 'Fundamentals of PYTHON In a Nutshell,' appears to be an introductory guide to the Python programming language.",
            authors: ["Harshavardhini Kyatam", "Jatin Menghwani"],
            category: "Programming",
            year: 2022,
            cover: "https://res.cloudinary.com/aacgriet/image/upload/v1730629103/AAC-web/books/chadjmxbuhgfqx3ox91r.png",
            color: "blue",
            status: "published",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        [STORAGE_KEYS.ALUMNI]: [
          {
            id: "sample-alumni-1",
            name: "John Doe",
            designation: "Software Engineer",
            company: "Google",
            image: "https://via.placeholder.com/300x300",
            graduationYear: 2020,
            department: "Computer Science Engineering",
            status: "active",
            email: "john@example.com",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
        [STORAGE_KEYS.STARTUPS]: [
          {
            id: "sample-startup-1",
            name: "TechVenture",
            description: "Innovative technology solutions for modern problems",
            mission: "To revolutionize the tech industry with cutting-edge solutions",
            category: "Technology",
            color: "blue",
            status: "Active",
            establishedDate: new Date("2023-01-01").toISOString(),
            website: "https://techventure.com",
            logo: "https://via.placeholder.com/200x200",
            image: "https://via.placeholder.com/400x300",
            founders: ["Jane Smith", "Bob Johnson"],
            appScreenshots: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      };

      // Add sample data to storage
      for (const [key, data] of Object.entries(sampleData)) {
        try {
          const existing = await StorageManager.get(key);
          // Only add if no data exists
          if (existing.length === 0) {
            await StorageManager.set(key, data);
          }
        } catch (err) {
          console.error(`Error adding sample data for ${key}:`, err);
        }
      }

      setStats({ migrated: true, timestamp: new Date().toISOString() });
      alert("Sample data added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Migration error:", error);
      setError(error.message);
      alert("Migration failed. Check console for details.");
    } finally {
      setMigrating(false);
    }
  };

  const handleClearData = async () => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      try {
        await StorageManager.clearAll();
        alert("All data cleared successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Clear data error:", error);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        const currentStats = {};
        for (const key of Object.values(STORAGE_KEYS)) {
          const data = await StorageManager.get(key);
          currentStats[key] = data.length;
        }
        setStats(currentStats);
      } catch (error) {
        console.error("Error loading stats:", error);
        setError(error.message);
      }
    };
    
    loadStats();
  }, []);

  return (
    <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-white">Data Migration Utility</h3>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg mb-4">
          Error: {error}
        </div>
      )}

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
                <span className="font-medium">{key.replace('aac_', '').toUpperCase()}:</span>{" "}
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
  const { data, loading, error, deleteItem, refresh } = useLocalStorage(
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
      try {
        const success = await deleteItem(id);
        if (success) {
          console.log("Item deleted successfully");
          await refresh();
        } else {
          console.error("Failed to delete item");
          alert("Failed to delete item");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting item: " + error.message);
      }
    }
  };

  const handleFormSuccess = async (result) => {
    console.log("Form submitted successfully:", result);
    setShowForm(false);
    setEditingId(null);
    await refresh();
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

  const handleExport = async () => {
    try {
      const exportData = await StorageManager.exportData();
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

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const importData = JSON.parse(e.target.result);
          console.log("Raw import data:", importData);

          let processedData = {};

          if (Array.isArray(importData)) {
            console.log("Detected array format");
            if (importData.length > 0 && importData[0].id && importData[0].title && importData[0].authors) {
              console.log("Detected books data format");
              processedData[STORAGE_KEYS.BOOKS] = importData;
            } else {
              console.log("Generic array detected, asking user for type");
              const dataType = prompt(
                "What type of data is this? Enter one of: news, projects, events, publications, patents, books, alumni, startups"
              );
              const storageKey = STORAGE_KEYS[dataType?.toUpperCase()];
              if (storageKey) {
                processedData[storageKey] = importData;
              } else {
                throw new Error("Invalid data type specified");
              }
            }
          } else if (typeof importData === "object") {
            processedData = importData;
          } else {
            throw new Error("Invalid JSON format");
          }

          console.log("Processed data:", processedData);
          const totalImported = await StorageManager.importData(processedData);
          
          alert(`Successfully imported ${totalImported} items!`);
          await refresh();
        } catch (error) {
          console.error("Import failed:", error);
          alert("Import failed: " + error.message);
        }
      };
      reader.readAsText(file);
    }
  };

  const renderForm = () => {
    const formProps = {
      onSuccess: handleFormSuccess,
      onCancel: handleFormCancel,
      ...(editingId && { [activeSection.slice(0, -1) + "Id"]: editingId }),
    };

    switch (activeSection) {
      case "news":
        return <NewsForm {...formProps} newsId={editingId} />;
      case "projects":
        return <ProjectsForm {...formProps} projectId={editingId} />;
      case "events":
        return <EventsForm {...formProps} eventId={editingId} />;
      case "publications":
        return <PublicationsForm {...formProps} publicationId={editingId} />;
      case "patents":
        return <PatentsForm {...formProps} patentId={editingId} />;
      case "books":
        return <BooksForm {...formProps} bookId={editingId} />;
      case "alumni":
        return <AlumniForm {...formProps} alumnusId={editingId} />;
      case "startups":
        return <StartupsForm {...formProps} startupId={editingId} />;
      default:
        return <div>Form not implemented for {activeSection}</div>;
    }
  };

  const getItemTitle = (item) => {
    return item.title || item.name || item.Name || item.event || item.shortTitle || "Untitled";
  };

  const getItemId = (item) => {
    return item.id || item._id || item.Id;
  };

  const getItemDate = (item) => {
    const date = item.publishedAt || item.createdAt || item.date || item.updatedAt;
    if (date) {
      return new Date(date).toLocaleDateString();
    }
    return "No date";
  };

  return (
    <Layout>
      <Head>
        <title>Admin Dashboard | AAC</title>
        <meta name="description" content="Admin dashboard for managing AAC website content" />
      </Head>

      <div className="min-h-screen bg-[#0e1421] py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your website content and data</p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {ADMIN_SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => {
                  setActiveSection(section.key);
                  setShowForm(false);
                  setEditingId(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeSection === section.key
                    ? "bg-blue-900 text-blue-300 border border-blue-700"
                    : "bg-[#1a2535] text-gray-300 hover:bg-gray-700 border border-gray-600"
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Utility Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={toggleImportExport}
              className="px-4 py-2 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors border border-green-700"
            >
              Import/Export Data
            </button>
            <button
              onClick={toggleMigration}
              className="px-4 py-2 bg-purple-900 text-purple-300 rounded-lg hover:bg-purple-800 transition-colors border border-purple-700"
            >
              Data Migration
            </button>
          </div>

          {/* Import/Export Section */}
          <AnimatePresence>
            {showImportExport && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-bold mb-4 text-white">Import/Export Data</h3>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={handleExport}
                      className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
                    >
                      Export All Data
                    </button>
                    <label className="px-4 py-2 bg-orange-900 text-orange-300 rounded-lg hover:bg-orange-800 transition-colors cursor-pointer border border-orange-700">
                      Import Data
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImport}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Migration Section */}
          <AnimatePresence>
            {showMigration && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8"
              >
                <SimpleMigrationComponent />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            {showForm ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderForm()}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1a2535] rounded-xl shadow-xl p-8 border border-gray-700"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Manage {currentSection?.label}
                  </h2>
                  <button
                    onClick={handleAdd}
                    className="px-6 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors border border-blue-700"
                  >
                    Add New {currentSection?.label.slice(0, -1)}
                  </button>
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-2 rounded-lg mb-4">
                    Error loading data: {error.message || error}
                  </div>
                )}

                {/* Data List */}
                {!loading && !error && (
                  <div className="space-y-4">
                    {data.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <p className="text-xl mb-4">No {currentSection?.label.toLowerCase()} found</p>
                        <p>Click "Add New" to create your first entry</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {data.map((item) => (
                          <div
                            key={getItemId(item)}
                            className="bg-[#0e1421] rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-grow">
                                <h3 className="text-lg font-semibold text-white mb-2">
                                  {getItemTitle(item)}
                                </h3>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                  <span>ID: {getItemId(item)}</span>
                                  <span>Date: {getItemDate(item)}</span>
                                  {item.status && <span>Status: {item.status}</span>}
                                  {item.categories && <span>Category: {item.categories}</span>}
                                  {item.category && <span>Category: {item.category}</span>}
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <button
                                  onClick={() => handleEdit(getItemId(item))}
                                  className="px-3 py-1 bg-blue-900 text-blue-300 rounded hover:bg-blue-800 transition-colors text-sm border border-blue-700"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(getItemId(item))}
                                  className="px-3 py-1 bg-red-900 text-red-300 rounded hover:bg-red-800 transition-colors text-sm border border-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;