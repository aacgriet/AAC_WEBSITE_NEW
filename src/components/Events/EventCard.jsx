// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import styles from './EventCard.module.css';

// const EventCard = ({ event, date, path, img }) => {
//   return (
//     <div className="flex justify-center">
//       <div className={styles.flipCard}>
//         <motion.div 
//           className={styles.flipCardInner}
//           whileHover={{ scale: 1.03 }}
//           transition={{ duration: 0.3 }}
//         >
//           <div className={styles.flipCardFront}>
//             <div className="pt-7 flex justify-center">
//               <Image 
//                 src={img} 
//                 alt={event}
//                 width={270}
//                 height={270}
//                 className="rounded-full opacity-30"
//               />
//             </div>
//           </div>
          
//           <div className={styles.flipCardBack}>
//             <h2 className="text-4xl font-bold mb-6">{date}</h2>
//             <p className="text-3xl pt-20 mb-6">{event}</p>
//             <Link 
//               href={path}
//               className="inline-block mt-5 py-5 px-6 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
//             >
//               Explore
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;
// src/components/Events/EventCard.jsx - Updated for database integration
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './EventCard.module.css';

const EventCard = ({ event, date, path, img, index = 0 }) => {
  // Generate the correct path if not provided
  const eventPath = path || `/Events/${event?.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  
  // Use provided image or fallback
  const eventImage = img || '/images/pic.webp';
  
  return (
    <motion.div 
      className="flex justify-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      <div className={styles.flipCard}>
        <motion.div 
          className={styles.flipCardInner}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.flipCardFront}>
            <div className="pt-7 flex justify-center">
              <Image 
                src={eventImage} 
                alt={event || 'Event'}
                width={270}
                height={270}
                className="rounded-full opacity-30"
              />
            </div>
          </div>
          
          <div className={styles.flipCardBack}>
            <h2 className="text-4xl font-bold mb-6">{date || 'TBD'}</h2>
            <p className="text-3xl pt-20 mb-6">{event || 'Event'}</p>
            <Link 
              href={eventPath}
              className="inline-block mt-5 py-5 px-6 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Explore
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventCard;