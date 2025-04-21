import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './EventCard.module.css';

const EventCard = ({ event, date, path, img }) => {
  return (
    <div className="flex justify-center">
      <div className={styles.flipCard}>
        <motion.div 
          className={styles.flipCardInner}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.flipCardFront}>
            <div className="pt-7 flex justify-center">
              <Image 
                src={img} 
                alt={event}
                width={270}
                height={270}
                className="rounded-full opacity-30"
              />
            </div>
          </div>
          
          <div className={styles.flipCardBack}>
            <h2 className="text-4xl font-bold mb-6">{date}</h2>
            <p className="text-3xl pt-20 mb-6">{event}</p>
            <Link 
              href={path}
              className="inline-block mt-5 py-5 px-6 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors"
            >
              Explore
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EventCard;