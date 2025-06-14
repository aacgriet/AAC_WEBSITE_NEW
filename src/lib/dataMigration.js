// src/lib/dataMigration.js - Fixed version without React dependency
import { StorageManager, STORAGE_KEYS } from './storage';
import booksData from '@/components/Data/booksData';
import alumniData from '@/components/Data/Alumniaac';

export class DataMigrationManager {
  static migrateAllData() {
    console.log('Starting data migration...');
    
    try {
      this.migrateBooksData();
      this.migrateAlumniData();
      this.migrateCoreCommitteeData();
      this.migratePublicationsData();
      this.migratePatentsData();
      this.createSampleNewsData();
      this.createSampleProjectsData();
      this.createSampleEventsData();
      
      console.log('Data migration completed successfully!');
      return true;
    } catch (error) {
      console.error('Data migration failed:', error);
      return false;
    }
  }

  static migrateBooksData() {
    console.log('Migrating books data...');
    
    const migratedBooks = booksData.map(book => ({
      id: book.id,
      title: book.title,
      description: book.description,
      authors: book.authors,
      category: book.category,
      year: book.year,
      cover: book.cover,
      color: book.color,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    StorageManager.set(STORAGE_KEYS.BOOKS, migratedBooks);
    console.log(`Migrated ${migratedBooks.length} books`);
  }

  static migrateAlumniData() {
    console.log('Migrating alumni data...');
    
    const migratedAlumni = alumniData.map(alumni => ({
      id: alumni.Id,
      name: alumni.Name,
      designation: alumni.Designation || 'Graduate',
      company: alumni.Company || '',
      image: alumni.Image,
      graduationYear: new Date().getFullYear() - Math.floor(Math.random() * 5),
      department: this.getRandomDepartment(),
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    StorageManager.set(STORAGE_KEYS.ALUMNI, migratedAlumni);
    console.log(`Migrated ${migratedAlumni.length} alumni`);
  }

  static migrateCoreCommitteeData() {
    console.log('Migrating core committee data...');
    
    const coreCommitteeData = [
      {
        id: "1",
        name: "Abhiram Pedamallu",
        designation: "President",
        image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160195/AAC-web/corecommittee2024/AbhiramPedamallu.jpg",
        year: 2024,
        department: "Computer Science"
      },
      {
        id: "3",
        name: "V. Dinesh Chandra",
        designation: "Vice President",
        image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160196/AAC-web/corecommittee2024/DineshChandraVakkapatla.jpg",
        year: 2024,
        department: "Information Technology"
      }
    ];

    const migratedCommittee = coreCommitteeData.map(member => ({
      ...member,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    StorageManager.set(STORAGE_KEYS.CORE_COMMITTEE, migratedCommittee);
    console.log(`Migrated ${migratedCommittee.length} core committee members`);
  }

  static migratePublicationsData() {
    console.log('Migrating publications data...');
    
    const publicationsData = [
      {
        id: "wine",
        title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
        abstract: 'This paper proposes a novel ensemble learning method for accurately predicting wine quality.',
        authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
        publication: "International Journal of Engineering Research and Technology(IJERT), ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
        category: "Machine Learning",
        year: 2024,
        status: "published"
      }
    ];

    const migratedPublications = publicationsData.map(pub => ({
      ...pub,
      type: 'Journal Paper',
      keywords: [pub.category.toLowerCase()],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    StorageManager.set(STORAGE_KEYS.PUBLICATIONS, migratedPublications);
    console.log(`Migrated ${migratedPublications.length} publications`);
  }

  static migratePatentsData() {
    console.log('Migrating patents data...');
    
    const patentsData = [
      {
        id: "aed",
        title: "Automated Pill Reminder Device",
        shortTitle: "Smart Pill Reminder",
        description: "An innovative device designed to help patients remember to take their medications on schedule.",
        inventors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop"],
        patentOffice: "India",
        date: "2019-01-21",
        applicationNumber: "201941002559",
        status: "Published Online",
        category: "Healthcare"
      }
    ];

    const migratedPatents = patentsData.map(patent => ({
      ...patent,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    StorageManager.set(STORAGE_KEYS.PATENTS, migratedPatents);
    console.log(`Migrated ${migratedPatents.length} patents`);
  }

  static createSampleNewsData() {
    console.log('Creating sample news data...');
    
    const sampleNews = [
      {
        id: "sample-news-1",
        title: "AAC Students Win National Hackathon",
        slug: "AAC team secures first place at the prestigious coding competition with their innovative healthcare solution.",
        content: "The Advanced Academic Center team has achieved remarkable success at the National Hackathon 2024. Our students presented an innovative healthcare monitoring system that uses IoT sensors and machine learning algorithms to predict health issues before they become critical.",
        publishedAt: new Date('2024-03-15').toISOString(),
        categories: "ACHIEVEMENT",
        status: "published"
      },
      {
        id: "sample-news-2",
        title: "New Research Partnership with Microsoft",
        slug: "AAC announces collaboration with Microsoft on artificial intelligence research projects.",
        content: "We are excited to announce a new research partnership with Microsoft Research that will focus on advancing artificial intelligence applications in education. This partnership represents a significant milestone in our commitment to cutting-edge research.",
        publishedAt: new Date('2024-02-20').toISOString(),
        categories: "RESEARCH",
        status: "published"
      }
    ];

    const migratedNews = sampleNews.map(news => ({
      ...news,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    StorageManager.set(STORAGE_KEYS.NEWS, migratedNews);
    console.log(`Created ${migratedNews.length} sample news articles`);
  }

  static createSampleProjectsData() {
    console.log('Creating sample projects data...');
    
    const sampleProjects = [
      {
        id: "sample-project-1",
        title: "Intelligent Campus Navigation System",
        slug: "intelligent-campus-navigation-system",
        description: "An AI-powered navigation system designed to help students and visitors navigate the campus efficiently using AR and indoor positioning.",
        content: "The Intelligent Campus Navigation System is a comprehensive solution that combines augmented reality, indoor positioning systems, and machine learning to provide seamless navigation experience within the campus.",
        publishedAt: new Date('2024-01-15').toISOString(),
        author: "Abhiram Pedamallu",
        names: ["Abhiram Pedamallu", "V. Dinesh Chandra", "Seetaram Koushik"],
        categories: "Mobile Development",
        status: "published"
      },
      {
        id: "sample-project-2",
        title: "Smart Energy Management System",
        slug: "smart-energy-management-system",
        description: "IoT-based energy monitoring and optimization system for reducing campus energy consumption using smart sensors and predictive analytics.",
        content: "The Smart Energy Management System utilizes Internet of Things (IoT) sensors and predictive analytics to monitor and optimize energy consumption across the campus infrastructure.",
        publishedAt: new Date('2023-11-20').toISOString(),
        author: "Abhiram Dodda",
        names: ["Abhiram Dodda", "Manav", "Srija Cherukuri"],
        categories: "IoT",
        status: "published"
      }
    ];

    const migratedProjects = sampleProjects.map(project => ({
      ...project,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    StorageManager.set(STORAGE_KEYS.PROJECTS, migratedProjects);
    console.log(`Created ${migratedProjects.length} sample projects`);
  }

  static createSampleEventsData() {
    console.log('Creating sample events data...');
    
    const sampleEvents = [
      {
        id: "sample-event-1",
        title: "Opulence 2025",
        slug: "opulence-2025",
        description: "AAC's flagship annual technical symposium featuring workshops, competitions, and industry expert sessions.",
        content: "Opulence 2025 is the most anticipated technical event of the year, bringing together students, faculty, and industry professionals for three days of innovation, learning, and competition.",
        date: new Date('2025-04-15').toISOString(),
        location: "GRIET Campus, Hyderabad",
        organizer: "Advanced Academic Center",
        status: "upcoming"
      }
    ];

    const migratedEvents = sampleEvents.map(event => ({
      ...event,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    StorageManager.set(STORAGE_KEYS.EVENTS, migratedEvents);
    console.log(`Created ${migratedEvents.length} sample events`);
  }

  static getRandomDepartment() {
    const departments = [
      'Computer Science Engineering',
      'Information Technology',
      'Electronics and Communication Engineering',
      'Electrical and Electronics Engineering',
      'Mechanical Engineering',
      'Civil Engineering'
    ];
    return departments[Math.floor(Math.random() * departments.length)];
  }

  static clearAllData() {
    console.log('Clearing all localStorage data...');
    StorageManager.clearAll();
    console.log('All data cleared successfully!');
  }

  static getDataStats() {
    const stats = {};
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      const data = StorageManager.get(storageKey);
      stats[key] = {
        count: data.length,
        storageKey,
        lastUpdated: data.length > 0 ? Math.max(...data.map(item => new Date(item.updatedAt || item.createdAt).getTime())) : null
      };
    });
    return stats;
  }
}