// src/pages/Publications/index.js
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import PageHero from '@/components/PageHero';

const publicationsData = [
  {
    id: "wine",
    title: "Ensemble–Based Wine Quality Detection using Hybrid Machine Learning Models",
    abstract: 'This paper proposes a novel ensemble learning method for accurately predicting wine quality, a crucial factor influencing market value and consumer satisfaction. The study combines four base machine-learning models: Random Forest, Logistic Regression, Support Vector Machines, and Gradient Boosting Machine. The models are optimized using Grid Search and combined via a Neural Network meta-classifier. The ensemble model was trained and tested on a dataset from Kaggle containing 1,599 instances of red wine data, each with 11 physicochemical input variables. Preprocessing involved standardizing features and transforming the target variable into categorical classes ("perfect," "good," "average," "bad," and "inedible"). The proposed ensemble model achieved an accuracy of 88.44%, exceeding the performance of individual base models. This result demonstrates the effectiveness of combining diverse models to capture complex relationships between wine properties and quality. The studys findings offer valuable insights for the wine industry by enabling improved quality control and informed decision-making regarding production, pricing, and marketing strategies.',
    authors: ["Dodda Abhiram", "Siddharth Mahesh Balijepally", "Ekantha Sai Sundar"],
    publication: "International Journal of Engineering Research and Technology(IJERT), ISSN: 2278-0181, Vol. 13 Issue 01, August 2024",
    image: "https://res.cloudinary.com/aacgriet/image/upload/v1730538693/AAC-web/publications/publications2023pics/wine.png",
    category: "Machine Learning",
    year: 2024
  },
  // Other publications data remains the same...
  {
    id: "oct",
    title: "Deep Learning and OCT Imaging: A Novel Ensemble Approach for Eye Disease Diagnosis",
    abstract: "This paper explores the effectiveness of an ensemble approach using Convolutional Neural Networks (CNNs) for classifying ocular diseases from retinal Optical Coherence Tomography (OCT) images. Three pre-trained CNN architectures—VGG16, InceptionV3, and InceptionResNetV2—are fine-tuned on an OCT image dataset and their predictions are combined using a max voting ensemble technique. The dataset consists of 84,484 images categorized into four classes: CNV, DME, DRUSEN, and NORMAL. The ensemble model achieved a remarkable accuracy of 98.86%, outperforming individual models. This result highlights the power of ensemble learning in handling complex patterns within OCT images and its potential for enhancing diagnostic accuracy in medical imaging applications. Future research directions include exploring diverse deep learning models and incorporating attention mechanisms to further improve performance.",
    authors: ["Dodda Abhiram", "R.Aruna Flarence", "K.Anuradha", "V.Srilakshmi"],
    publication: "4th International Conference on Cognitive & Intelligent Computing (ICCIC-2024), Springer Conference",
    image: "https://res.cloudinary.com/aacgriet/image/upload/v1730538693/AAC-web/publications/publications2023pics/OCT.png",
    category: "Deep Learning",
    year: 2024
  },
  {
    id: "skin",
    title: "A Novel Deep-Learning Based Classification of Skin Diseases",
    abstract: "This paper presents a novel deep convolutional neural network (CNN) model for the classification of eight common skin diseases. The model uses the EfficientNetB3 architecture for feature extraction and incorporates transfer learning from the ImageNet dataset. The study addresses the issue of dataset imbalance through a combination of data augmentation and under-sampling. This approach ensures the model generalizes well and does not overfit on the majority class. The balanced dataset contains an equal number of images (4000) for each of the eight classes. The model achieved a high accuracy of 95.27% in classifying skin disease images, demonstrating the effectiveness of deep CNNs for this task. The results indicate a significant improvement compared to models trained on imbalanced datasets. This research highlights the potential of deep learning in assisting medical professionals with accurate and timely diagnosis of skin diseases.",
    authors: ["Tabitha Indupalli", "Singamsetty Aashrith", "Dodda Abhiram", "Vineeth Vudiga", "Rayapuraju Srivatsav"],
    publication: "5th IEEE Global Conference on Advancement of Technology(GCAT) 2024",
    image: "https://res.cloudinary.com/aacgriet/image/upload/v1730539764/AAC-web/publications/publications2023pics/skin.png",
    category: "Deep Learning",
    year: 2024
  },
  {
    id: "plant",
    title: "A Novel Two-Stage Deep Learning Framework for Plant Disease Detection",
    abstract: "The two-stage approach you described in your abstract uses EfficientNetB3 and EfficientNetB5 as base models for transfer learning. These models were chosen for their efficiency and ability to extract relevant features. EfficientNetB3 is used in the first stage, which classifies the plant species, and EfficientNetB5 is used in the second stage, which classifies the disease.The second stage uses nine separate models for disease classification, each trained on a subset of the data for a specific plant species. The models are trained for 10 epochs, and the overall accuracy of the two-stage approach is 96.82%.",
    authors: ["Dodda Abhiram", "Dr. K. Anuradha", "Dr.V.Srilakshmi", "K. Adilakshmi"],
    publication: "5th IEEE Global Conference on Advancement of Technology(GCAT) 2024",
    image: "https://res.cloudinary.com/aacgriet/image/upload/v1730538693/AAC-web/publications/publications2023pics/plant.png",
    category: "Deep Learning",
    year: 2024
  },
  {
    id: "posture",
    title: "Smart Posture Detection and Correction system using Skeletal Points Extraction",
    abstract: "This paper is intended to present a smart posture recognition and correction system. In specific, sitting in wrong posture for persistent period of time results in many health problems such as back pain, soreness, poor circulation, cervical pains and also decrease in eyesight in the long run. The proposed model makes use of real time skeletal points extraction. This system is based on computer vision and machine learning algorithms",
    authors: ["J B V Prasad Raju, ECE, 16241A04D8", "Yelma Chethan Reddy, ECE, 16241A04H9", "Pradeep Reddy G"],
    publication: "Advances in Decision Sciences, Image Processing, Security and Computer Vision (pp.177-181), January 2020, DOI: 10.1007/978-3-030-24322-7_23",
    image: "https://res.cloudinary.com/aacgriet/image/upload/v1668795374/AAC-web/publications/smart_posture_tauukb.jpg",
    category: "Computer Vision",
    year: 2020
  },
  {
    id: "fourier",
    title: "Optimum Number of Fourier Descriptors for Closed Boundary Retrieval",
    abstract: "In the post segmentation scenario, when objects in the scene have been extracted, the focus shifts to object identification. This can be achieved through shape or texture. Finding the object boundary has been a reliable means of shape description. Among the mathematical approximation techniques for shape analysis, Fourier descriptors have proven to approximate closed boundaries of objects quite well, albeit with some limitations. A statistical thresholding technique to restrict the number of descriptors for a reasonably good approximation of the target shape is explored and tested on some medical images. Encouraging results were obtained particularly when segmentation in the preprocessing stage was effectively carried out.",
    authors: ["Dr. Ramamurthy Suri, Dean AAC, Professor BSH", "Gopi Krishna Pulluri, Asst.Professor, BSH", "Keerthana Nakka, ECE, 17241A04G1"],
    publication: "Gate to Computer Vision and Pattern Recognition vol. 2, no. 1, pp. 1-13, 2020 DOI:10.15579/gtcvpr.0201.001013",
    image: "https://res.cloudinary.com/aacgriet/image/upload/v1668795187/AAC-web/publications/descriptors_xq49ft.jpg",
    category: "Computer Vision",
    year: 2020
  },
  {
    id: "healthcare",
    title: "Advanced Healthcare System using Artificial Intelligence",
    abstract: "Matters like prescription and maintenance of health records hugely impact the efficiency of health care. Advanced technologies could be used to change the current scenario. This paper proposes a resourceful, web interface which enables access of medical records to the patients and a neural network model which predicts medication for ailments. The web interface acts as a medium between doctor and patient, allowing them to access the required information. The proposed method uses custom trained speech to text model and applies Natural Language Processing (NLP) on the acquired text, to provide the patient with a prescription. The proposed method further develops a neural network model which predicts the medication to be used by the patient, based on the symptoms. The proposed system achieved a Word Error Rate (WER) of 21.5% for the custom trained Speech to Text (STT) model. The AI bot used for medication prediction has achieved an accuracy of 88%.",
    authors: ["Pradeep Reddy G", "Santosh Sanjeev, ECE, 18241A04T1", "P Gowtham Sai, CSE, 18241A05X9"],
    publication: "2021, 11th International Conference on Cloud Computing, Data Science & Engineering (Confluence) DOI:10.1109/Confluence51648.2021.9377084",
    image: "https://res.cloudinary.com/aacgriet/image/upload/v1668795374/AAC-web/publications/health_yrxzq6.jpg",
    category: "Healthcare",
    year: 2021
  }
];

// Extract categories and years for filtering
const categories = ["All", ...new Set(publicationsData.map(pub => pub.category))];
const years = ["All", ...new Set(publicationsData.map(pub => pub.year))];

const PublicationCard = ({ publication, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-[#1a2535] rounded-xl shadow-xl overflow-hidden h-full flex flex-col border border-gray-700"
      onClick={() => onClick(publication.id)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={publication.image}
          alt={publication.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-blue-900 text-blue-300 text-xs font-medium px-2.5 py-1 rounded-full border border-blue-700">
          {publication.year}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900/50 text-blue-300 rounded-full border border-blue-700/50">
            {publication.category}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 text-white">{publication.title}</h3>
        <p className="text-gray-300 text-sm line-clamp-3 mb-4">{publication.abstract}</p>
        
        <div className="mt-auto">
          <div className="flex space-x-1">
            {publication.authors.slice(0, 2).map((author, index) => (
              <span key={index} className="text-sm text-gray-400">
                {author.split(',')[0]}{index < Math.min(1, publication.authors.length - 1) ? ',' : ''}
                {publication.authors.length > 2 && index === 1 ? ' et al.' : ''}
              </span>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              Read More →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PublicationDetail = ({ publication, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1a2535] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="relative h-60 w-full">
            <Image
              src={publication.image}
              alt={publication.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-[#0e1421] text-white rounded-full p-2 shadow-lg border border-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-900 rounded-full border border-blue-700">
                  {publication.category}
                </span>
                <span className="inline-block ml-2 px-3 py-1 text-xs font-medium bg-gray-700 bg-opacity-70 rounded-full">
                  {publication.year}
                </span>
              </div>
              <h2 className="text-2xl font-bold">{publication.title}</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-blue-300">Abstract</h3>
              <p className="text-gray-300 leading-relaxed">{publication.abstract}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-blue-300">Authors</h3>
              <ul className="list-disc list-inside space-y-1">
                {publication.authors.map((author, index) => (
                  <li key={index} className="text-gray-300">{author}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-blue-300">Publication</h3>
              <p className="text-gray-300">{publication.publication}</p>
            </div>
            
            <div className="flex justify-end mt-8">
              <button className="bg-blue-900 text-blue-300 border border-blue-700 px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Publications = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPublication, setSelectedPublication] = useState(null);
  
  // Filter publications based on search, category, and year
  const filteredPublications = publicationsData.filter(publication => {
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          publication.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          publication.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === "All" || publication.category === categoryFilter;
    const matchesYear = yearFilter === "All" || publication.year === parseInt(yearFilter);
    
    return matchesSearch && matchesCategory && matchesYear;
  });
  
  const handleViewPublication = (id) => {
    const publication = publicationsData.find(p => p.id === id);
    setSelectedPublication(publication);
  };
  
  return (
    <Layout>
      <Head>
        <title>Publications | AAC - Advanced Academic Center</title>
        <meta name="description" content="Academic publications from Advanced Academic Center at GRIET" />
      </Head>
      
      <PageHero 
        title="Publications" 
        subtitle="Explore our research papers and academic contributions in various domains"
        tag="Academic Research"
      />
      
      <div className="px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {/* Filter controls */}
          <div className="mb-12">
            <div className="bg-[#1a2535] rounded-xl p-6 shadow-lg border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                    Search Publications
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by title, abstract, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
                
                {/* Category filter */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                    Filter by Category
                  </label>
                  <select
                    id="category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                {/* Year filter */}
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">
                    Filter by Year
                  </label>
                  <select
                    id="year"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full px-4 py-2 bg-[#0e1421] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mb-6">
            <p className="text-gray-300">
              Showing {filteredPublications.length} of {publicationsData.length} publications
            </p>
          </div>
          
          {/* Publications grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPublications.map((publication) => (
              <PublicationCard
                key={publication.id}
                publication={publication}
                onClick={handleViewPublication}
              />
            ))}
            
            {filteredPublications.length === 0 && (
              <div className="col-span-3 py-16 text-center">
                <h3 className="text-2xl text-gray-300 mb-2">No publications found</h3>
                <p className="text-gray-400">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Publication detail modal */}
      <AnimatePresence>
        {selectedPublication && (
          <PublicationDetail
            publication={selectedPublication}
            onClose={() => setSelectedPublication(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Publications;