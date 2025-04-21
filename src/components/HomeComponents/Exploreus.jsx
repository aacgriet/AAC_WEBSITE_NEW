import React from 'react';
import { motion } from 'framer-motion';

const ExploreCard = ({ title, body }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <motion.div
      className="bg-white shadow-xl rounded-md transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
      whileHover={{ y: -10 }}
    >
      <div 
        className="h-36 flex items-center justify-center px-6 cursor-pointer border-b-4 border-[#172E7C]"
        onClick={() => setIsOpen(true)}
      >
        <h3 className="text-xl md:text-2xl font-bold text-center font-serif">{title}</h3>
      </div>
      
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-xl max-w-lg w-full"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4 font-serif">{title}</h3>
              <p className="mb-4 font-sans">{body}</p>
            </div>
            <div className="flex justify-end bg-gray-50 px-6 py-3 rounded-b-lg">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const Exploreus = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 font-serif"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Us
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <ExploreCard 
            title="Vision and Mission" 
            body="Advanced Academic Center (AAC) aspires to be a pre-eminent and inclusive student-focused research unit, preparing young minds in design thinking and innovation for societal problems. As an innovation center with the capacity to attract and engage the best talent in the institute. A culture of innovation and discovery is cultivated by supporting experiential learning and entrepreneurial endeavors among students."
          />
          
          <ExploreCard 
            title="Who are we?" 
            body="The Advanced Academic Center (AAC) of GRIET, Hyderabad is an inter-disciplinary research centre. We are committed to excellence in teaching, learning, and research at AAC, and we continue to flourish in this modern age. Focusing mainly on a broad area of research and development, bringing together experts with diverse backgrounds to address aspects of that problem area, along with the continuous advancements in science."
          />
          
          <ExploreCard 
            title="What do we offer?" 
            body="Students are engaged in designing and executing projects with AAC, we organize workshops and lectures on specialized engineering software and hardware tools. Offering an unparalleled student experience and a generous financial aid program as well. Along with this we also provide mentorship from real time industrial experts as well as Sponsored / Consultancy R&D projects as well. Students at AAC are encouraged to learn scientific and technical skills, to explore the various fields present and help with society's needs in the future."
          />
        </div>
      </div>
    </div>
  );
};

export default Exploreus;