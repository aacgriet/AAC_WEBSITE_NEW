// src/lib/dataMigration.js
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
      },
      {
        id: "5",
        name: "Abhiram Dodda",
        designation: "Technical Coordinator",
        image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160195/AAC-web/corecommittee2024/AbhiramDodda.jpg",
        year: 2024,
        department: "Computer Science"
      },
      {
        id: "6",
        name: "Seetaram Koushik",
        designation: "Database Coordinator",
        image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160199/AAC-web/corecommittee2024/SeetaramKoushik.jpg",
        year: 2024,
        department: "Computer Science"
      },
      {
        id: "7",
        name: "Manav",
        designation: "Finance Coordinator",
        image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160196/AAC-web/corecommittee2024/Manav.webp",
        year: 2024,
        department: "Electronics"
      },
      {
        id: "8",
        name: "Srija Cherukuri",
        designation: "PR Coordinator",
        image: "https://res.cloudinary.com/aacgriet/image/upload/c_fill,w_1600,h_1600,ar_1:1,g_auto/v1717160199/AAC-web/corecommittee2024/SrijaCherukuri.jpg",
        year: 2024,
        department: "Computer Science"
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
        abstract: 'This paper proposes a novel ensemble learning method for accurately predicting wine quality, a crucial factor influencing market value and consumer satisfaction. The study combines four base machine-learning models: Random Forest, Logistic Regression, Support Vector Machines, and Gradient Boosting Machine.',
        authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
        publication: "International Journal of Engineering Research and Technology(IJERT), ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
        image: "https://res.cloudinary.com/aacgriet/image/upload/v1730538693/AAC-web/publications/publications2023pics/wine.png",
        category: "Machine Learning",
        year: 2024,
        status: "published"
      },
      {
        id: "oct",
        title: "Deep Learning and OCT Imaging: A Novel Ensemble Approach for Eye Disease Diagnosis",
        abstract: "This paper explores the effectiveness of an ensemble approach using Convolutional Neural Networks (CNNs) for classifying ocular diseases from retinal Optical Coherence Tomography (OCT) images.",
        authors: ["Dodda Abhiram", "R.Aruna Flarence", "K.Anuradha", "V.Srilakshmi"],
        publication: "4th International Conference on Cognitive & Intelligent Computing (ICCIC-2024), Springer Conference",
        image: "https://res.cloudinary.com/aacgriet/image/upload/v1730538693/AAC-web/publications/publications2023pics/OCT.png",
        category: "Deep Learning",
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
        title: "An automated electronic device for reminding consumption of pills scheduled and even for missed schedules with specified two way confirmation along with replaceable pill compartments layer as value addition been facilitated to the changing requirements.",
        shortTitle: "Automated Pill Reminder Device",
        description: "This patent is for an innovative device designed to help patients remember to take their medications on schedule. The device includes multiple pill compartments that can be customized and provides two-way confirmation to ensure medications are taken properly.",
        inventors: ["Yelma Chethan Reddy", "Alence Abhinay", "B.S.V.S Anoop", "M Srikanth", "D.Naga pavan", "G Pradeep Reddy"],
        patentOffice: "India",
        date: "21 JAN 2019",
        applicationNumber: "201941002559",
        status: "Published Online",
        category: "Healthcare",
        image: "/images/patents/aed.jpg"
      },
      {
        id: "smartglove",
        title: "A SMART GLOVE FOR RECOGNIZING AND COMMUNICATING SIGN LANGUAGE AND ASSOCIATED METHOD THEREOF.",
        shortTitle: "Smart Glove for Sign Language",
        description: "This patent describes a wearable technology in the form of a glove that can recognize sign language gestures and translate them into text or speech.",
        inventors: ["Jashwanth Kranthi Bopanna", "Santosh Sanjeev", "Bharath Varma Kantheti", "Gowtham Sai Ponnekanti", "Suhas Gangireddy", "G Pradeep Reddy"],
        patentOffice: "India",
        date: "03 SEP 2020",
        applicationNumber: "202041038106",
        status: "Published Online",
        category: "Assistive Technology",
        image: "/images/patents/smartglove.jpg"
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
        content: "The Advanced Academic Center team has achieved remarkable success at the National Hackathon 2024. \n\nOur students presented an innovative **healthcare monitoring system** that uses IoT sensors and machine learning algorithms to predict health issues before they become critical.\n\n## Key Features\n- Real-time health monitoring\n- Predictive analytics\n- User-friendly mobile interface\n- Emergency alert system\n\nThe judges were particularly impressed with the *practical application* and the potential for real-world deployment.",
        publishedAt: new Date('2024-03-15').toISOString(),
        categories: "ACHIEVEMENT",
        mainImage: {
          url: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
          altText: "AAC students celebrating their hackathon victory"
        },
        status: "published"
      },
      {
        id: "sample-news-2",
        title: "New Research Partnership with Microsoft",
        slug: "AAC announces collaboration with Microsoft on artificial intelligence research projects.",
        content: "We are excited to announce a new research partnership with **Microsoft Research** that will focus on advancing artificial intelligence applications in education.\n\n### Partnership Highlights\n- Joint research projects on AI in education\n- Access to Microsoft's Azure AI services\n- Internship opportunities for AAC students\n- Co-publication of research findings\n\nThis partnership represents a significant milestone in our commitment to cutting-edge research and industry collaboration.",
        publishedAt: new Date('2024-02-20').toISOString(),
        categories: "RESEARCH",
        mainImage: {
          url: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
          altText: "Microsoft and AAC partnership announcement"
        },
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
        content: "The Intelligent Campus Navigation System is a comprehensive solution that combines **augmented reality**, **indoor positioning systems**, and **machine learning** to provide seamless navigation experience within the campus.\n\n## Key Features\n- AR-based visual guidance\n- Indoor GPS using Wi-Fi and Bluetooth beacons\n- Real-time crowd density monitoring\n- Accessibility features for differently-abled users\n- Multi-language support\n\n## Technology Stack\n- **Frontend**: React Native for mobile app\n- **Backend**: Node.js with Express\n- **Database**: MongoDB\n- **AR Framework**: ARCore/ARKit\n- **Machine Learning**: TensorFlow for crowd prediction\n\n## Impact\nThe system has been deployed across the campus and has helped over 5000+ users navigate efficiently, reducing the time spent finding locations by 60%.",
        publishedAt: new Date('2024-01-15').toISOString(),
        author: "Abhiram Pedamallu",
        teamMembers: ["Abhiram Pedamallu", "V. Dinesh Chandra", "Seetaram Koushik"],
        categories: "Mobile Development",
        technologies: ["React Native", "Node.js", "MongoDB", "ARCore", "TensorFlow"],
        duration: "8 months",
        githubUrl: "https://github.com/aacgriet/campus-navigation",
        liveUrl: "https://campus-nav.aacgriet.org",
        mainImage: {
          url: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100162/AAC-web/news_events/Juniorshackathon2_opwpyj.jpg",
          altText: "Campus navigation system interface"
        },
        status: "published"
      },
      {
        id: "sample-project-2",
        title: "Smart Energy Management System",
        slug: "smart-energy-management-system",
        description: "IoT-based energy monitoring and optimization system for reducing campus energy consumption using smart sensors and predictive analytics.",
        content: "The Smart Energy Management System utilizes **Internet of Things (IoT)** sensors and **predictive analytics** to monitor and optimize energy consumption across the campus infrastructure.\n\n## System Architecture\n- IoT sensors for real-time energy monitoring\n- Cloud-based data processing and storage\n- Machine learning models for consumption prediction\n- Automated control systems for energy optimization\n- Web dashboard for monitoring and control\n\n## Key Achievements\n- 25% reduction in overall energy consumption\n- Real-time monitoring of 150+ devices\n- Predictive maintenance alerts\n- Cost savings of ₹50,000+ per month\n\n## Technologies Used\n- **Hardware**: Arduino, Raspberry Pi, Various sensors\n- **Backend**: Python with Flask, PostgreSQL\n- **Frontend**: Vue.js dashboard\n- **Cloud**: AWS IoT Core\n- **ML**: Scikit-learn for predictive models",
        publishedAt: new Date('2023-11-20').toISOString(),
        author: "Abhiram Dodda",
        teamMembers: ["Abhiram Dodda", "Manav", "Srija Cherukuri"],
        categories: "IoT",
        technologies: ["Arduino", "Raspberry Pi", "Python", "Vue.js", "AWS IoT", "PostgreSQL"],
        duration: "6 months",
        githubUrl: "https://github.com/aacgriet/energy-management",
        mainImage: {
          url: "https://res.cloudinary.com/aacgriet/image/upload/c_scale,h_400,w_500/v1664100167/AAC-web/news_events/nrsc5_e8it62.jpg",
          altText: "Energy management system dashboard"
        },
        status: "published"
      }
    ];

    const migratedProjects = sampleProjects.map(project => ({
      ...project,
      names: project.teamMembers, // For backward compatibility
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
        content: "Opulence 2025 is the most anticipated technical event of the year, bringing together students, faculty, and industry professionals for three days of innovation, learning, and competition.\n\n## Event Highlights\n- **Technical Workshops** on latest technologies\n- **Coding Competitions** with exciting prizes\n- **Industry Expert Sessions** from top companies\n- **Project Exhibitions** by students\n- **Networking Sessions** with alumni and professionals\n\n## Registration Details\n- **Early Bird**: ₹500 (until March 15)\n- **Regular**: ₹750 (after March 15)\n- **Group Discount**: 10% off for teams of 4+\n\n## Important Dates\n- Registration Opens: March 1, 2025\n- Abstract Submission: March 20, 2025\n- Event Dates: April 15-17, 2025",
        date: new Date('2025-04-15').toISOString(),
        endDate: new Date('2025-04-17').toISOString(),
        location: "GRIET Campus, Hyderabad",
        venue: "Main Auditorium and Labs",
        organizer: "Advanced Academic Center",
        images: [
          "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/s1gv2z0j7nzctxmyyrxh.jpg",
          "https://res.cloudinary.com/aacgriet/image/upload/v1730825381/AAC-web/news_events/opulence2023/zdcnmfzelmh4u20wyr1x.jpg"
        ],
        status: "upcoming",
        registrationRequired: true,
        registrationUrl: "https://opulence.aacgriet.org/register",
        maxParticipants: "500",
        contactEmail: "opulence@aacgriet.org",
        tags: ["technical", "symposium", "competition", "workshops"]
      },
      {
        id: "sample-event-2",
        title: "AI/ML Workshop Series",
        slug: "ai-ml-workshop-series",
        description: "Comprehensive workshop series on Artificial Intelligence and Machine Learning fundamentals and applications.",
        content: "Join our intensive **AI/ML Workshop Series** designed for students who want to dive deep into the world of artificial intelligence and machine learning.\n\n## Workshop Modules\n\n### Module 1: Foundations (Week 1-2)\n- Introduction to AI and ML\n- Python for Data Science\n- Mathematical foundations\n- Data preprocessing techniques\n\n### Module 2: Machine Learning (Week 3-4)\n- Supervised learning algorithms\n- Unsupervised learning\n- Model evaluation and validation\n- Hands-on projects\n\n### Module 3: Deep Learning (Week 5-6)\n- Neural networks fundamentals\n- TensorFlow and Keras\n- Computer vision applications\n- Natural language processing\n\n### Module 4: Advanced Topics (Week 7-8)\n- Reinforcement learning\n- MLOps and deployment\n- Ethics in AI\n- Capstone project\n\n## What You'll Get\n- Certificate of completion\n- Hands-on project experience\n- Industry mentor guidance\n- Access to premium datasets\n- Job placement assistance",
        date: new Date('2025-03-01').toISOString(),
        endDate: new Date('2025-04-26').toISOString(),
        location: "AAC Lab, GRIET",
        venue: "Computer Labs and Online Sessions",
        organizer: "Advanced Academic Center",
        images: [
          "https://res.cloudinary.com/aacgriet/image/upload/v1730825380/AAC-web/news_events/opulence2023/gor2ysygdbqylqjgqybv.jpg"
        ],
        status: "upcoming",
        registrationRequired: true,
        registrationUrl: "https://workshops.aacgriet.org/ai-ml",
        maxParticipants: "50",
        contactEmail: "workshops@aacgriet.org",
        tags: ["workshop", "ai", "machine learning", "hands-on"]
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

// Utility component for running migrations
export const MigrationComponent = () => {
  const [stats, setStats] = React.useState(null);
  const [migrating, setMigrating] = React.useState(false);

  const handleMigration = async () => {
    setMigrating(true);
    try {
      const success = DataMigrationManager.migrateAllData();
      if (success) {
        setStats(DataMigrationManager.getDataStats());
        alert('Migration completed successfully!');
      } else {
        alert('Migration failed. Check console for details.');
      }
    } catch (error) {
      console.error('Migration error:', error);
      alert('Migration failed. Check console for details.');
    } finally {
      setMigrating(false);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      DataMigrationManager.clearAllData();
      setStats(DataMigrationManager.getDataStats());
      alert('All data cleared successfully!');
    }
  };

  React.useEffect(() => {
    setStats(DataMigrationManager.getDataStats());
  }, []);

  return (
    <div className="bg-[#1a2535] rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-white">Data Migration Utility</h3>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={handleMigration}
          disabled={migrating}
          className="px-4 py-2 bg-blue-900 text-blue-300 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 border border-blue-700"
        >
          {migrating ? 'Migrating...' : 'Run Migration'}
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
            {Object.entries(stats).map(([key, data]) => (
              <div key={key} className="text-gray-300">
                <span className="font-medium">{key}:</span> {data.count} items
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};