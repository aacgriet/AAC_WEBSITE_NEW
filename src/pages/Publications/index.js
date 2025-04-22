// src/pages/Publications/index.js
import React, { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';

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
      className="bg-white rounded-xl shadow-xl overflow-hidden h-full flex flex-col"
      onClick={() => onClick(publication.id)}
    >
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={publication.image}
          alt={publication.title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {publication.year}
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20"></div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {publication.category}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2">{publication.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{publication.abstract}</p>
        
        <div className="mt-auto">
          <div className="flex space-x-1">
            {publication.authors.slice(0, 2).map((author, index) => (
              <span key={index} className="text-sm text-gray-500">
                {author.split(',')[0]}{index < Math.min(1, publication.authors.length - 1) ? ',' : ''}
                {publication.authors.length > 2 && index === 1 ? ' et al.' : ''}
              </span>
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
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
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
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
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-600 rounded-full">
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
              <h3 className="text-lg font-bold mb-2 text-blue-800">Abstract</h3>
              <p className="text-gray-700 leading-relaxed">{publication.abstract}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-blue-800">Authors</h3>
              <ul className="list-disc list-inside space-y-1">
                {publication.authors.map((author, index) => (
                  <li key={index} className="text-gray-700">{author}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-blue-800">Publication</h3>
              <p className="text-gray-700">{publication.publication}</p>
            </div>
            
            <div className="flex justify-end mt-8">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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
  const publicationsRef = useRef(null);
  
  // Filter publications based on category, year, and search term
  const filteredPublications = publicationsData.filter(publication => {
    const matchesCategory = categoryFilter === "All" || publication.category === categoryFilter;
    const matchesYear = yearFilter === "All" || publication.year.toString() === yearFilter;
    const matchesSearch = publication.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          publication.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          publication.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesYear && matchesSearch;
  });
  
  const handlePublicationClick = (id) => {
    const publication = publicationsData.find(pub => pub.id === id);
    setSelectedPublication(publication);
  };
  
  const handleCloseModal = () => {
    setSelectedPublication(null);
  };
  
  return (
    <Layout>
      <Head>
        <title>Publications | AAC - Advanced Academic Center</title>
        <meta name="description" content="Research publications from Advanced Academic Center at GRIET" />
      </Head>
      
      <div className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full mb-4">
              Research
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Publications
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our research work and publications contributed by students and faculty at AAC.
            </p>
          </motion.div>
          
          {/* Filters and search */}
          <div className="mb-12" ref={publicationsRef}>
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category filter */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="block w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Year filter */}
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    id="year"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="block w-full py-2.5 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Search input */}
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
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
                      placeholder="Search publications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Publications grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {filteredPublications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPublications.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication}
                    onClick={handlePublicationClick}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.5 3.25H14.5C16.57 3.25 18.25 4.93 18.25 7V19.25L12 14.75L5.75 19.25V7C5.75 4.93 7.43 3.25 9.5 3.25Z" />
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-900">No publications found</h3>
                <p className="mt-2 text-gray-600">
                  Try adjusting your filters or search criteria.
                </p>
                <button
                  onClick={() => {
                    setCategoryFilter("All");
                    setYearFilter("All");
                    setSearchTerm("");
                  }}
                  className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </motion.div>
          
          {/* Publication detail modal */}
          <AnimatePresence>
            {selectedPublication && (
              <PublicationDetail
                publication={selectedPublication}
                onClose={handleCloseModal}
              />
            )}
          </AnimatePresence>
          
          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="py-12 px-6 md:px-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-white mb-4">Research Impact</h2>
                <p className="text-blue-100 max-w-2xl mx-auto">
                  Our publications have contributed to advancements in various fields of technology and research.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { number: "25+", label: "Publications" },
                  { number: "15+", label: "Conferences" },
                  { number: "30+", label: "Citations" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Publications;